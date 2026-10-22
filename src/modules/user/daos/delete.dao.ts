import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user.entity';

@Injectable()
export class DeleteDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<UserEntity> {
    return await this.prismaService.user.delete({
      where: { id },
      include: { roles: true },
    });
  }
}
