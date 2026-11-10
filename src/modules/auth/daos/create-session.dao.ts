import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class CreateSessionDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(session: SessionEntity): Promise<SessionEntity> {
    return await this.prismaService.sessionEntity.create({ data: session });
  }
}
