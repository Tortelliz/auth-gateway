import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FullUserEntity } from '../user.entity';

@Injectable()
export class FindByEmailDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(email: string): Promise<FullUserEntity> {
    return await this.prismaService.userEntity.findUniqueOrThrow({
      where: { email },
      include: { roles: true },
    });
  }
}
