import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { PasswordTokenEntity } from '../../../../generated/prisma/client';
import { hashToken } from '../../../utils/hash-token.util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CheckPasswordTokenService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<PasswordTokenEntity> {
    const dbToken = await this.getPasswordToken(token);
    this.checkIsExpired(dbToken);
    this.checkRevoked(dbToken);
    return dbToken;
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
        throw new UnauthorizedException('Invalid token');
      throw error;
    }
  }

  private checkIsExpired(token: PasswordTokenEntity): void {
    if (new Date() >= token.expires_at)
      throw new UnauthorizedException(
        `Token expired at ${token.expires_at.toLocaleString()}`,
      );
  }

  private checkRevoked(token: PasswordTokenEntity): void {
    if (token.revoked && token.revoked_at)
      throw new UnauthorizedException(
        `Token revoked at ${token.revoked_at.toLocaleString()}`,
      );
  }
}
