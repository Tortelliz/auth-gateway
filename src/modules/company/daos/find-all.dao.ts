import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CompanyEntity } from '../company.entity';

@Injectable()
export class FindAllDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(): Promise<CompanyEntity[]> {
    return await this.prismaService.company.findMany({
      orderBy: { name: 'asc' },
      include: {
        address: {
          omit: {
            company_id: true,
          },
        },
      },
    });
  }
}
