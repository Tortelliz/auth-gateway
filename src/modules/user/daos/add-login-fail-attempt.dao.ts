import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class AddLoginFailAttemptDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
    return await this.prismaService.user.update({
      where: { id },
      data: {
        failed_login_attempts: user.failed_login_attempts + 1,
      },
      include: { roles: true },
    });
  }
}
