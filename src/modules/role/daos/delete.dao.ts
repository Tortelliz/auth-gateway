import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../../../../generated/prisma/client';

@Injectable()
export class DeleteDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<RoleEntity> {
    return await this.prismaService.roleEntity.delete({
      where: { id },
    });
  }
}
