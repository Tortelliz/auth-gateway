import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { CompanyEntity } from '../company.entity';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { PaginationService } from '../../../common/pagination/pagination.service';

@Injectable()
export class FindAllDAO {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async execute(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyEntity[]>> {
    this.paginationService.checkFields(
      pagination,
      ['cnpj', 'code', 'name'],
      ['id', 'cnpj', 'code', 'name', 'created_at', 'updated_at'],
    );
    const query = this.paginationService.buildToFind(pagination);
    const result: CompanyEntity[] = await this.prismaService.company.findMany({
      ...query,
      include: {
        address: {
          omit: {
            company_id: true,
          },
        },
      },
    });
    const count = await this.prismaService.company.count({
      where: query.where,
    });
    return this.paginationService.buildToReturn(pagination, count, result);
  }
}
