import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class FindByEmailDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(email: string): Promise<UserEntity> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { email },
      include: { roles: true },
    });
  }
}
