import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { PasswordTokenEntity } from '../../../../generated/prisma/client';

@Injectable()
export class UpdatePasswordTokenDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    id: string,
    entity: PasswordTokenEntity,
  ): Promise<PasswordTokenEntity> {
    return await this.prismaService.passwordTokenEntity.update({
      where: { id },
      data: entity,
    });
  }
}
