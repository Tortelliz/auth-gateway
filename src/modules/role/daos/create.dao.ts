import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../role.entity';

@Injectable()
export class CreateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(role: RoleEntity): Promise<RoleEntity> {
    return await this.prismaService.role.create({ data: role });
  }
}
