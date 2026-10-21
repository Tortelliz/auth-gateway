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
    const query = this.paginationService.buildToFind(pagination);
    const result = await this.prismaService.company.findMany({
      ...query,
      include: {
        address: {
          omit: {
            company_id: true,
          },
        },
      },
    });
    const count = await this.prismaService.company.count();
    return this.paginationService.buildToReturn(pagination, count, result);
  }
}
