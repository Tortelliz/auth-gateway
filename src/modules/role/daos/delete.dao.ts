import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../role.entity';

@Injectable()
export class DeleteDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<RoleEntity> {
    return await this.prismaService.role.delete({
      where: { id },
    });
  }
}
