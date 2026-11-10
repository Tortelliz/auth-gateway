import { Injectable } from '@nestjs/common';
import { CreateSessionDao } from './create-session.dao';
import { UpdateSessionDao } from './update-session.dao';
import { SessionEntity } from '../../../../generated/prisma/client';
import { FindSessionByTokenDao } from './find-session-by-token.dao';

@Injectable()
export class AuthDao {
  constructor(
    private readonly createSessionDao: CreateSessionDao,
    private readonly updateSessionDao: UpdateSessionDao,
    private readonly findSessionByTokenDao: FindSessionByTokenDao,
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
}
