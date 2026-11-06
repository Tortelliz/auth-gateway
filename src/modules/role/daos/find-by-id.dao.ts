import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindByIdDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<RoleEntity> {
    return await this.prismaService.roleEntity.findUniqueOrThrow({
      where: { id },
    });
  }
}
