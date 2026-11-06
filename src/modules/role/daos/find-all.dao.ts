import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { RoleEntity } from '../../../../generated/prisma/client';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { PaginationService } from '../../../common/pagination/pagination.service';

@Injectable()
export class FindAllDao {
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
      ['id', 'code', 'name', 'description', 'create_at', 'update_at'],
    );
    const query = this.paginationService.buildToFind(pagination);
    const roles = await this.prismaService.roleEntity.findMany({
      ...query,
    });
    const count = await this.prismaService.roleEntity.count({
      where: { ...query.where },
    });
    return this.paginationService.buildToReturn(pagination, count, roles);
  }
}
