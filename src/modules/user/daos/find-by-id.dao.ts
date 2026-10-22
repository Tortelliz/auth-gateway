import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { UserEntity } from '../user.entity';

@Injectable()
export class FindByIdDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<UserEntity> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      include: { roles: true },
    });
  }
}
