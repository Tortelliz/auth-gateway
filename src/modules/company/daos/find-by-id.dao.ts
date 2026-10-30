import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Company, CompanyAddress } from '../../../../generated/prisma/client';

@Injectable()
export class FindByIdDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<Company & { address: CompanyAddress }> {
    const { address, ...company } =
      await this.prismaService.company.findUniqueOrThrow({
        where: { id },
        include: { address: true },
      });
    if (!address)
      throw new NotFoundException('No existing address for this company');
    return { ...company, address };
  }
}
