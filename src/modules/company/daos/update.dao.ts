import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Company, CompanyAddress } from '../../../../generated/prisma/client';

@Injectable()
export class UpdateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    id: string,
    company: Company & { address: CompanyAddress },
  ): Promise<Company & { address: CompanyAddress }> {
    const { address, ...rest } = company;
    const updatedCompany = await this.prismaService.company.update({
      where: { id },
      data: rest,
    });
    const updatedAddress = await this.prismaService.companyAddress.update({
      where: { id: company.address.id },
      data: address,
    });
    return {
      ...updatedCompany,
      address: updatedAddress,
    };
  }
}
