import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindByUserIdDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string): Promise<RoleEntity[]> {
    const res = await this.prismaService.userRoleEntity.findMany({
      where: { user_id: userId },
      select: {
        role: true,
      },
    });
    return res.map((item) => {
      return item.role;
    });
  }
}
