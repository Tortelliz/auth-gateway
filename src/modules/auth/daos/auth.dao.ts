import { Injectable } from '@nestjs/common';
import { CreateSessionDao } from './create-session.dao';
import { UpdateSessionDao } from './update-session.dao';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class AuthDao {
  constructor(
    private readonly createSessionDao: CreateSessionDao,
    private readonly updateSessionDao: UpdateSessionDao,
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
}
