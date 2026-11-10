import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindSessionByTokenDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(hashToken: string): Promise<SessionEntity> {
    return await this.prismaService.sessionEntity.findUniqueOrThrow({
      where: { hash_token: hashToken },
    });
  }
}
