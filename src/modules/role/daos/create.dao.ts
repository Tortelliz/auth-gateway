import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../../../../generated/prisma/client';

@Injectable()
export class CreateDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(role: RoleEntity): Promise<RoleEntity> {
    return await this.prismaService.roleEntity.create({ data: role });
  }
}
