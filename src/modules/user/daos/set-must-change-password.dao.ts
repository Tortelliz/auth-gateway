import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class SetMustChangePasswordDAO {
  constructor(private readonly prismaService: PrismaService) {}
  async execute(id: string): Promise<UserEntity> {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        must_change_password: true,
      },
      include: {
        roles: true,
      },
    });
  }
}
