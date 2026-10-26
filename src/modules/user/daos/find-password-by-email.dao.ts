import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';

@Injectable()
export class FindPasswordByEmailDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(email: string): Promise<{ password: string } | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
      select: { password: true },
    });
  }
}
