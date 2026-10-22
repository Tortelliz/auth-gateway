import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class UpdateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, user: UserEntity): Promise<UserEntity> {
    const { roles, ...rest } = user;
    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: rest,
    });
    await this.prismaService.userRole.deleteMany({ where: { user_id: id } });
    const createdUserRoles =
      await this.prismaService.userRole.createManyAndReturn({
        data: roles,
      });
    return {
      ...updatedUser,
      roles: createdUserRoles,
    };
  }
}
