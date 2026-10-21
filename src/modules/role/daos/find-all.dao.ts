import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../role.entity';
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
  ): Promise<PaginationResponseDTO<RoleEntity[]>> {
    this.paginationService.checkFields(
      pagination,
      ['code', 'name', 'description'],
      ['id', 'code', 'name', 'description', 'created_at', 'updated_at'],
    );
    const query = this.paginationService.buildToFind(pagination);
    const result: RoleEntity[] = await this.prismaService.role.findMany(query);
    const count = await this.prismaService.role.count({
      where: query.where,
    });
    return this.paginationService.buildToReturn(pagination, count, result);
  }
}
