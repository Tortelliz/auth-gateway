import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindByCompanyIdDao {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(companyId: string): Promise<RoleEntity[]> {
    return await this.prismaService.roleEntity.findMany({
      where: { company_id: companyId },
    });
  }
}
