import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { SessionEntity } from '../../../../generated/prisma/client';
import { hashToken } from '../../../utils/hash-token.util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CheckSessionTokenService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<SessionEntity> {
    const session = await this.getSession(token);
    this.checkIsExpired(session);
    this.checkRevoked(session);
    return session;
  }

  private async getSession(token: string): Promise<SessionEntity> {
    try {
      return await this.authRepository.findSessionByToken(hashToken(token));
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnauthorizedException('Invalid token');
      throw error;
    }
  }

  private checkIsExpired(session: SessionEntity): void {
    if (new Date() >= session.expires_at)
      throw new UnauthorizedException(
        `Token expired at ${session.expires_at.toLocaleString()}`,
      );
  }

  private checkRevoked(session: SessionEntity): void {
    if (session.revoked && session.revoked_at)
      throw new UnauthorizedException(
        `Token revoked at ${session.revoked_at.toLocaleString()}`,
      );
  }
}
