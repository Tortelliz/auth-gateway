import { Injectable } from '@nestjs/common';
import { SessionEntity } from './auth.entity';
import { AuthDAO } from './daos/auth.dao';

@Injectable()
export abstract class AuthContract {
  abstract createSession(session: SessionEntity): Promise<SessionEntity>;
  abstract revokeSession(hashToken: string): Promise<SessionEntity>;
  abstract findSessionByHashToken(hashToken: string): Promise<SessionEntity>;
}

@Injectable()
export class AuthRepository implements AuthContract {
  constructor(private readonly authDAO: AuthDAO) {}

  async revokeSession(hashToken: string): Promise<SessionEntity> {
    return await this.authDAO.revokeSession(hashToken);
  }

  async findSessionByHashToken(hashToken: string): Promise<SessionEntity> {
    return await this.authDAO.findSessionByHashToken(hashToken);
  }

  async createSession(session: SessionEntity): Promise<SessionEntity> {
    return await this.authDAO.createSession(session);
  }
}
