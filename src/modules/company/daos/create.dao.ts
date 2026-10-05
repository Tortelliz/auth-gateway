import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CompanyEntity } from '../company.entity';

@Injectable()
export class CreateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(company: CompanyEntity): Promise<CompanyEntity> {
    return await this.prismaService.company.create({ data: company });
  }
}
