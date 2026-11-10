import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { PasswordTokenEntity } from '../../../../generated/prisma/client';

@Injectable()
export class CreatePasswordTokenDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(entity: PasswordTokenEntity): Promise<PasswordTokenEntity> {
    return await this.prismaService.passwordTokenEntity.create({
      data: entity,
    });
  }
}
