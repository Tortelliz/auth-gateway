import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FullUserEntity } from '../user.entity';

@Injectable()
export class CreateDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(user: FullUserEntity): Promise<FullUserEntity> {
    const { roles, ...rest } = user;
    const res = await this.prismaService.userEntity.create({
      data: rest,
      include: {
        roles: true,
      },
    });
    await this.prismaService.userRoleEntity.createMany({ data: roles });
    return res;
  }
}
