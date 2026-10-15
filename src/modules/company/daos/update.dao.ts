import { CompanyEntity } from '../company.entity';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, company: CompanyEntity) {
    return await this.prismaService.company.update({
      where: { id },
      data: company,
    });
  }
}
