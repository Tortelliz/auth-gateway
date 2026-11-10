import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { PasswordTokenEntity } from '../../../../generated/prisma/client';
import { hashToken } from '../../../utils/hash-token.util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CheckPasswordTokenService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<boolean> {
    const verifiedToken = await this.getPasswordToken(token);
    this.checkIsExpired(verifiedToken);
    this.checkRevoked(verifiedToken);
    return true;
  }

  private async getPasswordToken(token: string): Promise<PasswordTokenEntity> {
    try {
      return await this.authRepository.findPasswordTokenByToken(
        hashToken(token),
      );
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new BadRequestException('Invalid token');
      throw error;
    }
  }

  private checkIsExpired(token: PasswordTokenEntity): void {
    if (new Date() >= token.expires_at)
      throw new ForbiddenException('Token expired');
  }

  private checkRevoked(token: PasswordTokenEntity): void {
    if (token.revoked && token.revoked_at)
      throw new ForbiddenException(
        `Token revoked at ${token.revoked_at.toLocaleString()}`,
      );
  }
}
