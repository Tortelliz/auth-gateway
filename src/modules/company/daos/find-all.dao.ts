import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { PaginationService } from '../../../common/pagination/pagination.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { CompanyDto } from '../company.dto';

@Injectable()
export class FindAllDao {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async execute(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDto[]>> {
    this.paginationService.checkFields(
      pagination,
      ['cnpj', 'code', 'name'],
      ['id', 'cnpj', 'code', 'name', 'created_at', 'updated_at'],
    );
    const query = this.paginationService.buildToFind(pagination);
    const companies = await this.prismaService.companyEntity.findMany({
      ...query,
      include: {
        address: {
          omit: { company_id: true },
        },
      },
    });
    const count = await this.prismaService.companyEntity.count({
      where: query.where,
    });
    return this.paginationService.buildToReturn(pagination, count, companies);
  }
}
