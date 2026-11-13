import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FindSessionByTokenService } from '../services/find-session-by-token.service';
import { SessionEntity } from '../../../../generated/prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

@Injectable()
export class CheckIsValidTokenGuard {
  constructor(
    private readonly findSessionByTokenService: FindSessionByTokenService,
  ) {}

  async execute(rawToken: string): Promise<SessionEntity> {
    this.checkIsNotNull(rawToken);
    const session = await this.getSession(rawToken);
    this.checkIsExpired(session);
    this.checkRevoked(session);
    return session;
  }

  private async getSession(token: string): Promise<SessionEntity> {
    try {
      return await this.findSessionByTokenService.execute(token);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnauthorizedException('Invalid auth token');
      throw error;
    }
  }

  private checkIsNotNull(token: string): void {
    if (!token) throw new UnauthorizedException('Auth token is required');
  }

  private checkIsExpired(session: SessionEntity): void {
    if (new Date() >= session.expires_at)
      throw new UnauthorizedException(
        `Auth token expired at ${session.expires_at.toLocaleString()}`,
      );
  }

  private checkRevoked(session: SessionEntity): void {
    if (session.revoked && session.revoked_at)
      throw new UnauthorizedException(
        `Auth token revoked at ${session.revoked_at.toLocaleString()}`,
      );
  }
}
