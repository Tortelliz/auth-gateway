import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { SessionEntity } from '../auth.entity';

@Injectable()
export class FindSessionByHashTokenDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(hashToken: string): Promise<SessionEntity> {
    return await this.prismaService.session.findUniqueOrThrow({
      where: { hash_token: hashToken },
    });
  }
}
