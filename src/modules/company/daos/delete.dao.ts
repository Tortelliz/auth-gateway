import { PrismaService } from '../../../infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CompanyEntity } from '../company.entity';

@Injectable()
export class DeleteDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string): Promise<CompanyEntity> {
    return await this.prismaService.company.delete({
      where: { id },
      include: { address: true },
    });
  }
}
