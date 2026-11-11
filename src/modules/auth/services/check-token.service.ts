import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { TokenEntity } from '../../../../generated/prisma/client';
import { hashToken } from '../../../utils/hash-token.util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CheckTokenService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<TokenEntity> {
    const dbToken = await this.getPasswordToken(token);
    this.checkIsExpired(dbToken);
    this.checkRevoked(dbToken);
    return dbToken;
  }

  private async getPasswordToken(token: string): Promise<TokenEntity> {
    try {
      return await this.authRepository.findTokenByToken(hashToken(token));
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnauthorizedException('Invalid token');
      throw error;
    }
  }

  private checkIsExpired(token: TokenEntity): void {
    if (new Date() >= token.expires_at)
      throw new UnauthorizedException(
        `Token expired at ${token.expires_at.toLocaleString()}`,
      );
  }

  private checkRevoked(token: TokenEntity): void {
    if (token.revoked && token.revoked_at)
      throw new UnauthorizedException(
        `Token revoked at ${token.revoked_at.toLocaleString()}`,
      );
  }
}
