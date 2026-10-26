import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class SetPasswordDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string, password: string): Promise<UserEntity> {
    return await this.prismaService.user.update({
      where: { id: userId },
      data: {
        password,
        updated_at: new Date(),
        must_change_password: false,
        failed_login_attempts: 0,
      },
      include: { roles: true },
    });
  }
}
