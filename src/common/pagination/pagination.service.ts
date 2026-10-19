import { Injectable } from '@nestjs/common';
import { OrderBy, PaginationRequestDTO } from './pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaginationService {
  constructor(private readonly configService: ConfigService) {}

  buildToFind(pagination: PaginationRequestDTO) {
    const defaultPageSize = this.getDefaultPageSize();
    const orderBy =
      !pagination.order_by_field || !pagination.order_by_type
        ? { created_at: 'desc' as const }
        : { [pagination.order_by_field]: pagination.order_by_type };
    const take = pagination?.size || defaultPageSize;
    const skip =
      !pagination.size || !pagination.page
        ? 0
        : (pagination.page - 1) * pagination.size;
    const filterFields = pagination.filter_fields?.split(',');
    const where = filterFields
      ? {
          OR: filterFields?.map((field: string) => ({
            [field]: {
              contains: pagination.filter_search,
              mode: 'insensitive',
            },
          })),
        }
      : {};
    return {
      orderBy,
      where,
      take,
      skip,
    };
  }

  buildToReturn(pagination: PaginationRequestDTO, result: Array<any>) {
    const rows = result.length;
    const page = pagination.page || 1;
    const defaultPageSize = this.getDefaultPageSize();
    const pagesSize = pagination.size || defaultPageSize;
    const realPages = Math.ceil(rows / pagesSize);
    const hasNextPage = page < realPages && realPages !== 0;
    const hasPrevPage = page > realPages && realPages !== 0;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;
    return {
      page,
      size: defaultPageSize,
      total_items: rows,
      total_pages: realPages,
      has_next_page: hasNextPage,
      has_prev_page: hasPrevPage,
      next_page: nextPage,
      prev_page: prevPage,
      filter_search: pagination.filter_search || '',
      filter_fields: pagination.filter_fields || '',
      order_by_type: (pagination.order_by_type as OrderBy) || '',
      order_by_field: pagination.order_by_field || '',
      pages: result,
    };
  }

  private getDefaultPageSize(): number {
    return Number(
      this.configService.getOrThrow<number>('PAGINATION_DEFAULT_PAGE_SIZE'),
    );
  }
}
