import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FullCompanyEntity } from '../company.entity';

@Injectable()
export class UpdateDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(
    id: string,
    company: FullCompanyEntity,
  ): Promise<FullCompanyEntity> {
    const { address, ...rest } = company;
    const res = await this.prismaService.companyEntity.update({
      where: { id },
      data: rest,
      include: { address: true },
    });
    if (address) {
      await this.prismaService.companyAddressEntity.update({
        where: { id: address.id },
        data: address,
      });
    }
    return res;
  }
}
