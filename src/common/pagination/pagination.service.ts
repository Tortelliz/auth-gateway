import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PaginationRequestDTO, PaginationResponseDTO } from './pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaginationService {
  constructor(private readonly configService: ConfigService) {}

  private execute(
    pagination: PaginationRequestDTO,
    totalRows?: number,
    result?: Array<any>,
  ): PaginationResponseDTO<any> {
    this.checkMatches(pagination);
    const effResult = result && result.length > 0 ? result : [];
    const rows = totalRows || 0;
    const page = pagination.page || 1;
    const defaultPageSize = this.getDefaultPageSize();
    const pageSize = pagination.size || defaultPageSize;
    const realPages = Math.ceil(rows / pageSize);
    const hasNextPage = page + 1 <= realPages;
    const hasPrevPage = page - 1 > 0 && page - 1 < realPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;
    const filterFields = pagination.filter_fields?.split(',') || [];
    const orderBy =
      !pagination.order_by_field || !pagination.order_by_type
        ? [{ created_at: 'desc' as const }]
        : { [pagination.order_by_field]: pagination.order_by_type };
    const filter =
      filterFields.length > 0
        ? {
            OR: filterFields.map((field: string) => ({
              [field]: {
                contains: pagination.filter_search,
                mode: 'insensitive',
              },
            })),
          }
        : {};
    return {
      page,
      size: pageSize,
      items: result?.length || 0,
      total_items: rows,
      total_pages: realPages,
      has_next_page: hasNextPage,
      has_prev_page: hasPrevPage,
      next_page: nextPage,
      prev_page: prevPage,
      order_by: orderBy,
      filter,
      pages: effResult,
    };
  }

  buildToFind(pagination: PaginationRequestDTO) {
    const res = this.execute(pagination);
    const take = res.size;
    const skip = (res.page - 1) * res.size;
    return {
      orderBy: res.order_by,
      where: res.filter,
      take,
      skip,
    };
  }

  buildToReturn(
    pagination: PaginationRequestDTO,
    totalRows: number,
    result: Array<any>,
  ): PaginationResponseDTO<any> {
    return this.execute(pagination, totalRows, result);
  }

  private getDefaultPageSize(): number {
    return Number(
      this.configService.getOrThrow<number>('PAGINATION_DEFAULT_PAGE_SIZE'),
    );
  }

  checkFields(
    pagination: PaginationRequestDTO,
    filterMatchList: string[],
    orderByMatchList: string[],
  ): void {
    if (pagination.filter_fields) {
      const fields = pagination.filter_fields.split(',');
      const trustList = fields.map((field) => {
        return filterMatchList.includes(field);
      });
      trustList.forEach((field) => {
        if (!field)
          throw new ForbiddenException(
            'Some value provided in filter_fields is invalid',
          );
      });
    }
    if (pagination.order_by_field) {
      const res = orderByMatchList.includes(pagination.order_by_field);
      if (!res)
        throw new ForbiddenException(
          'The value provided in order_by_field is invalid',
        );
    }
  }

  private checkMatches(pagination: PaginationRequestDTO): void {
    if (
      (!pagination.order_by_type && pagination.order_by_field) ||
      (!pagination.order_by_field && pagination.order_by_type)
    ) {
      throw new BadRequestException(
        'The two parameters (order_by_type) and (order_by_field) must be provided to use order by',
      );
    }
    if (
      (!pagination.filter_search && pagination.filter_fields) ||
      (!pagination.filter_fields && pagination.filter_search)
    ) {
      throw new BadRequestException(
        'The two parameters (filter_search) and (filter_fields) must be provided to use filters',
      );
    }
  }
}
