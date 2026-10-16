import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CompanyEntity } from '../company.entity';

@Injectable()
export class FindByIdDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<CompanyEntity> {
    return await this.prismaService.company.findUniqueOrThrow({
      where: { id },
      include: { address: true },
    });
  }
}
