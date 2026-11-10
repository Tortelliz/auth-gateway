import { Injectable } from '@nestjs/common';
import { CreateSessionDao } from './create-session.dao';
import { UpdateSessionDao } from './update-session.dao';
import {
  PasswordTokenEntity,
  SessionEntity,
} from '../../../../generated/prisma/client';
import { FindSessionByTokenDao } from './find-session-by-token.dao';
import { CreatePasswordTokenDao } from './create-password-token.dao';
import { UpdatePasswordTokenDao } from './update-password-token.dao';
import { FindPasswordTokenByTokenDao } from './find-password-token-by-token.dao';

@Injectable()
export class AuthDao {
  constructor(
    private readonly createSessionDao: CreateSessionDao,
    private readonly updateSessionDao: UpdateSessionDao,
    private readonly findSessionByTokenDao: FindSessionByTokenDao,
    private readonly createPasswordTokenDao: CreatePasswordTokenDao,
    private readonly updatePasswordTokenDao: UpdatePasswordTokenDao,
    private readonly findPasswordTokenByTokenDao: FindPasswordTokenByTokenDao,
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

  async createPasswordToken(
    entity: PasswordTokenEntity,
  ): Promise<PasswordTokenEntity> {
    return await this.createPasswordTokenDao.execute(entity);
  }

  async updatePasswordToken(
    id: string,
    entity: PasswordTokenEntity,
  ): Promise<PasswordTokenEntity> {
    return await this.updatePasswordTokenDao.execute(id, entity);
  }

  async findPasswordTokenByToken(token: string): Promise<PasswordTokenEntity> {
    return await this.findPasswordTokenByTokenDao.execute(token);
  }
}
