import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../../../../generated/prisma/client';

@Injectable()
export class UpdateDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, role: RoleEntity): Promise<RoleEntity> {
    return await this.prismaService.roleEntity.update({
      where: { id },
      data: role,
    });
  }
}
