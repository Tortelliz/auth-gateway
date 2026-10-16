import { CompanyEntity } from '../company.entity';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string, company: CompanyEntity) {
    const { address, ...rest } = company;
    const updatedCompany = await this.prismaService.company.update({
      where: { id },
      data: rest,
    });
    const updatedAddress = await this.prismaService.companyAddress.update({
      where: { id: company.address!.id! },
      data: address!,
    });
    return {
      ...updatedCompany,
      address: updatedAddress,
    };
  }
}
