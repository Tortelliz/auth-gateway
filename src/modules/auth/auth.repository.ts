import { Injectable } from '@nestjs/common';
import { SessionEntity } from '../../../generated/prisma/client';
import { AuthDao } from './daos/auth.dao';

@Injectable()
abstract class AuthContract {
  abstract createSession(session: SessionEntity): Promise<SessionEntity>;
  abstract updateSession(
    id: string,
    session: SessionEntity,
  ): Promise<SessionEntity>;
  abstract findSessionByToken(token: string): Promise<SessionEntity>;
}

@Injectable()
export class AuthRepository implements AuthContract {
  constructor(private readonly authDao: AuthDao) {}

  async createSession(session: SessionEntity): Promise<SessionEntity> {
    return await this.authDao.createSession(session);
  }

  async updateSession(
    id: string,
    session: SessionEntity,
  ): Promise<SessionEntity> {
    return await this.authDao.updateSession(id, session);
  }

  async findSessionByToken(token: string): Promise<SessionEntity> {
    return await this.authDao.findSessionByToken(token);
  }
}
