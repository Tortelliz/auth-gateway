import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../role.entity';

@Injectable()
export class FindAllDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<RoleEntity[]> {
    return await this.prismaService.role.findMany({
      orderBy: { name: 'asc' },
    });
  }
}
