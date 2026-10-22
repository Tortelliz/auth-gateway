import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class CreateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(user: UserEntity): Promise<UserEntity> {
    const { roles, ...rest } = user;
    const createdUser = await this.prismaService.user.create({
      data: rest,
    });
    const createdUserRoles =
      await this.prismaService.userRole.createManyAndReturn({
        data: roles,
      });
    return {
      ...createdUser,
      roles: createdUserRoles,
    };
  }
}
