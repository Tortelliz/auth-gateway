import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class UpdateSessionDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, session: SessionEntity): Promise<SessionEntity> {
    return await this.prismaService.sessionEntity.update({
      where: { id },
      data: session,
    });
  }
}
