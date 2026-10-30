import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Company, CompanyAddress } from '../../../../generated/prisma/client';

@Injectable()
export class CreateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    company: Company & { address: CompanyAddress },
  ): Promise<Company & { address: CompanyAddress }> {
    const { address, ...rest } = company;
    const createdCompany = await this.prismaService.company.create({
      data: rest,
    });
    const createdCompanyAddress =
      await this.prismaService.companyAddress.create({
        data: {
          ...address,
          company_id: createdCompany.id,
        },
      });
    return {
      ...createdCompany,
      address: createdCompanyAddress,
    };
  }
}
