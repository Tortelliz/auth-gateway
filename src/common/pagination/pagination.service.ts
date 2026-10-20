import { Injectable, Logger } from '@nestjs/common';
import { PaginationRequestDTO, PaginationResponseDTO } from './pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaginationService {
  private readonly logger = new Logger(PaginationService.name);
  constructor(private readonly configService: ConfigService) {}

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
    result: Array<any>,
  ): PaginationResponseDTO<any> {
    return this.execute(pagination, result);
  }

  private getDefaultPageSize(): number {
    return Number(
      this.configService.getOrThrow<number>('PAGINATION_DEFAULT_PAGE_SIZE'),
    );
  }

  private execute(
    pagination: PaginationRequestDTO,
    result?: Array<any>,
  ): PaginationResponseDTO<any> {
    const rows = result?.length || 0;
    const page = pagination.page || 1;
    const defaultPageSize = this.getDefaultPageSize();
    const pagesSize = pagination.size || defaultPageSize;
    const realPages = Math.ceil(rows / pagesSize);
    const hasNextPage = page < realPages && realPages !== 0;
    const hasPrevPage = page > realPages && realPages !== 0;
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
      size: defaultPageSize,
      total_items: rows,
      total_pages: realPages,
      has_next_page: hasNextPage,
      has_prev_page: hasPrevPage,
      next_page: nextPage,
      prev_page: prevPage,
      order_by: orderBy,
      filter,
      pages: result,
    };
  }
}
