import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { SessionEntity } from '../../../../generated/prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { hashToken } from '../../../utils/hash-token.util';

@Injectable()
export class LogoutService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<void> {
    const session = await this.getSession(token);
    this.checkIsExpired(session);
    this.checkRevoked(session);
    await this.authRepository.updateSession(session.id, this.build(session));
  }

  private build(session: SessionEntity): SessionEntity {
    return {
      id: session.id,
      user_id: session.user_id,
      hash_token: session.hash_token,
      revoked: true,
      created_at: session.created_at,
      expires_at: session.expires_at,
      revoked_at: new Date(),
    };
  }

  private async getSession(token: string): Promise<SessionEntity> {
    try {
      return await this.authRepository.findSessionByToken(hashToken(token));
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new BadRequestException('Invalid token');
      throw error;
    }
  }

  private checkIsExpired(session: SessionEntity): void {
    if (new Date() >= session.expires_at)
      throw new ForbiddenException('Token expired');
  }

  private checkRevoked(session: SessionEntity): void {
    if (session.revoked && session.revoked_at)
      throw new ForbiddenException(
        `Token revoked at ${session.revoked_at.toLocaleString()}`,
      );
  }
}
