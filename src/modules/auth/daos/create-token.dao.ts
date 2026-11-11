import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { TokenEntity } from '../../../../generated/prisma/client';

@Injectable()
export class CreateTokenDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(entity: TokenEntity): Promise<TokenEntity> {
    return await this.prismaService.tokenEntity.create({
      data: entity,
    });
  }
}
