import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { TokenEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindTokenByTokenDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(hashToken: string): Promise<TokenEntity> {
    return await this.prismaService.tokenEntity.findUniqueOrThrow({
      where: { hash_token: hashToken },
    });
  }
}
