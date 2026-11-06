import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FullUserEntity } from '../user.entity';

@Injectable()
export class UpdateDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, user: FullUserEntity): Promise<FullUserEntity> {
    const { roles, ...rest } = user;
    await this.prismaService.userRoleEntity.deleteMany({
      where: { user_id: id },
    });
    await this.prismaService.userRoleEntity.createMany({ data: roles });
    return await this.prismaService.userEntity.update({
      where: { id },
      data: rest,
      include: {
        roles: true,
      },
    });
  }
}
