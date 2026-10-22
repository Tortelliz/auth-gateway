import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { PaginationService } from '../../../common/pagination/pagination.service';
import { UserDTO } from '../user.dto';

@Injectable()
export class FindAllByCompanyIdDAO {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async execute(
    companyId: string,
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDTO[]>> {
    this.paginationService.checkFields(
      pagination,
      ['email', 'first_name', 'last_name'],
      [
        'id',
        'company_id',
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
    const { where, ...rest } = query;
    const result: UserDTO[] = await this.prismaService.user.findMany({
      ...rest,
      where: {
        ...where,
        company_id: companyId,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        active: true,
        last_login_at: true,
        failed_login_attempts: true,
        must_change_password: true,
        roles: {
          select: {
            role: true,
          },
        },
        company: {
          include: {
            address: {
              omit: {
                company_id: true,
              },
            },
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
    const count = await this.prismaService.user.count({
      where: {
        ...where,
        company_id: companyId,
      },
    });
    return this.paginationService.buildToReturn(pagination, count, result);
  }
}
