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
    const updatedUserRoles =
      await this.prismaService.userRole.updateManyAndReturn({
        where: { user_id: updatedUser.id },
        data: roles,
      });
    return {
      ...updatedUser,
      roles: updatedUserRoles,
    };
  }
}
