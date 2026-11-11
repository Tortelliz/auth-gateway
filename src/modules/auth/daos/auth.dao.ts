import { Injectable } from '@nestjs/common';
import { CreateSessionDao } from './create-session.dao';
import { UpdateSessionDao } from './update-session.dao';
import {
  TokenEntity,
  SessionEntity,
} from '../../../../generated/prisma/client';
import { FindSessionByTokenDao } from './find-session-by-token.dao';
import { CreateTokenDao } from './create-token.dao';
import { UpdateTokenDao } from './update-token.dao';
import { FindTokenByTokenDao } from './find-token-by-token.dao';

@Injectable()
export class AuthDao {
  constructor(
    private readonly createSessionDao: CreateSessionDao,
    private readonly updateSessionDao: UpdateSessionDao,
    private readonly findSessionByTokenDao: FindSessionByTokenDao,
    private readonly createPasswordTokenDao: CreateTokenDao,
    private readonly updatePasswordTokenDao: UpdateTokenDao,
    private readonly findPasswordTokenByTokenDao: FindTokenByTokenDao,
  ) {}

  async createSession(session: SessionEntity): Promise<SessionEntity> {
    return await this.createSessionDao.execute(session);
  }

  async updateSession(
    id: string,
    session: SessionEntity,
  ): Promise<SessionEntity> {
    return await this.updateSessionDao.execute(id, session);
  }

  async findSessionByToken(token: string): Promise<SessionEntity> {
    return await this.findSessionByTokenDao.execute(token);
  }

  async createToken(entity: TokenEntity): Promise<TokenEntity> {
    return await this.createPasswordTokenDao.execute(entity);
  }

  async updateToken(id: string, entity: TokenEntity): Promise<TokenEntity> {
    return await this.updatePasswordTokenDao.execute(id, entity);
  }

  async findTokenByToken(token: string): Promise<TokenEntity> {
    return await this.findPasswordTokenByTokenDao.execute(token);
  }
}
