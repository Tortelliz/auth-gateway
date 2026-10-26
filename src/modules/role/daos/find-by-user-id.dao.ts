import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../role.entity';

@Injectable()
export class FindByUserIdDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<{ role: RoleEntity }[]> {
    return await this.prismaService.userRole.findMany({
      where: { user_id: id },
      select: {
        role: true,
      },
    });
  }
}
