import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { SessionEntity } from '../../../../generated/prisma/client';
import { CheckSessionTokenService } from './check-session-token.service';

@Injectable()
export class LogoutService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  async execute(token: string): Promise<void> {
    const session = await this.checkSessionTokenService.execute(token);
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
}
