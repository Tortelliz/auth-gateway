import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CompanyEntity } from '../company.entity';

@Injectable()
export class CreateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(company: CompanyEntity): Promise<CompanyEntity> {
    const { address, ...rest } = company;
    const createdCompany = await this.prismaService.company.create({
      data: rest,
    });
    const createdCompanyAddress =
      await this.prismaService.companyAddress.create({
        data: {
          ...address!,
          company_id: createdCompany.id,
        },
      });
    return {
      ...createdCompany,
      address: createdCompanyAddress,
    };
  }
}
