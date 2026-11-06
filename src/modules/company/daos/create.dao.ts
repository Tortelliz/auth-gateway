import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FullCompanyEntity } from '../company.entity';

@Injectable()
export class CreateDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(company: FullCompanyEntity): Promise<FullCompanyEntity> {
    const { address, ...rest } = company;
    const res = await this.prismaService.companyEntity.create({
      data: rest,
      include: { address: true },
    });
    if (address) {
      await this.prismaService.companyAddressEntity.create({
        data: address,
      });
    }
    return res;
  }
}
