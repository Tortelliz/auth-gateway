import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { SessionEntity } from '../auth.entity';

@Injectable()
export class CreateSessionDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(session: SessionEntity): Promise<SessionEntity> {
    return await this.prismaService.session.create({ data: session });
  }
}
