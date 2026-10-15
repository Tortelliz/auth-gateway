import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string) {
    return await this.prismaService.company.delete({
      where: { id },
    });
  }
}
