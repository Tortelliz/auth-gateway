import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FullUserEntity } from '../user.entity';

@Injectable()
export class FindByIdDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<FullUserEntity> {
    return await this.prismaService.userEntity.findUniqueOrThrow({
      where: { id },
      include: { roles: true },
    });
  }
}
