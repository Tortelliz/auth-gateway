import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../role.entity';

@Injectable()
export class UpdateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, role: RoleEntity): Promise<RoleEntity> {
    return await this.prismaService.role.update({
      where: { id },
      data: role,
    });
  }
}
