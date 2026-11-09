import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { UserDto } from '../user.dto';
import { PaginationService } from '../../../common/pagination/pagination.service';

@Injectable()
export class FindAllDao {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async execute(
    companyId: string,
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    this.paginationService.checkFields(
      pagination,
      ['email', 'first_name', 'last_name'],
      [
        'id',
        'email',
        'first_name',
        'last_name',
        'last_login_at',
        'failed_login_attempts',
        'created_at',
        'updated_at',
      ],
    );
    const query = this.paginationService.buildToFind(pagination);
    const users = await this.prismaService.userEntity.findMany({
      orderBy: { ...query.orderBy },
      take: query.take,
      skip: query.skip,
      where: { ...query.where, active: true, company_id: companyId },
      omit: {
        password: true,
        failed_login_attempts: true,
        active: true,
        must_change_password: true,
      },
      include: {
        roles: {
          select: {
            role: true,
          },
        },
      },
    });
    const count = await this.prismaService.userEntity.count({
      where: { ...query.where, active: true },
    });
    return this.paginationService.buildToReturn(pagination, count, users);
  }
}
