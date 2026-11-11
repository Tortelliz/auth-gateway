import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { TokenEntity } from '../../../../generated/prisma/client';

@Injectable()
export class UpdateTokenDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, entity: TokenEntity): Promise<TokenEntity> {
    return await this.prismaService.tokenEntity.update({
      where: { id },
      data: entity,
    });
  }
}
