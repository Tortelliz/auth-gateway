import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { PasswordTokenEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindPasswordTokenByTokenDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(hashToken: string): Promise<PasswordTokenEntity> {
    return await this.prismaService.passwordTokenEntity.findUniqueOrThrow({
      where: { hash_token: hashToken },
    });
  }
}
