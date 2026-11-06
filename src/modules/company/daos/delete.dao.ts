import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { FullCompanyEntity } from '../company.entity';

@Injectable()
export class DeleteDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<FullCompanyEntity> {
    return await this.prismaService.companyEntity.delete({
      where: { id },
      include: { address: true },
    });
  }
}
