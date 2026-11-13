import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class LogoutService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: SessionEntity): Promise<void> {
    await this.authRepository.updateSession(token.id, this.build(token));
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
}
