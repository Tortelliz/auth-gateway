import { Injectable } from '@nestjs/common';
import { FindSessionByHashTokenDAO } from './find-session-by-hash-token.dao';
import { RevokeSessionDAO } from './revoke-session.dao';
import { SessionEntity } from '../auth.entity';
import { CreateSessionDAO } from './create-session.dao';

@Injectable()
export class AuthDAO {
  constructor(
    private readonly createSessionDAO: CreateSessionDAO,
    private readonly findSessionByHashTokenDAO: FindSessionByHashTokenDAO,
    private readonly revokeSessionDAO: RevokeSessionDAO,
  ) {}

  async createSession(session: SessionEntity): Promise<SessionEntity> {
    return await this.createSessionDAO.execute(session);
  }

  async findSessionByHashToken(hashToken: string): Promise<SessionEntity> {
    return await this.findSessionByHashTokenDAO.execute(hashToken);
  }

  async revokeSession(hashToken: string): Promise<SessionEntity> {
    return await this.revokeSessionDAO.execute(hashToken);
  }
}
