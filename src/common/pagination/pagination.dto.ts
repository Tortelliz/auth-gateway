import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderBy {
  asc = 'asc',
  desc = 'desc',
}

export class PaginationRequestDTO {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number;
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  size?: number;
  @IsString()
  @IsOptional()
  filter_search?: string;
  @IsString()
  @IsOptional()
  filter_fields?: string;
  @IsString()
  @IsEnum(OrderBy)
  @IsOptional()
  order_by_type?: 'asc' | 'desc';
  @IsString()
  @IsOptional()
  order_by_field?: string;
}

export class PaginationResponseDTO<T> {
  @IsNumber()
  page: number;
  @IsNumber()
  size: number;
  @IsNumber()
  total_items: number;
  @IsNumber()
  total_pages: number;
  @IsBoolean()
  has_next_page: boolean;
  @IsNumber()
  next_page: number | null;
  @IsBoolean()
  has_prev_page: boolean;
  @IsNumber()
  prev_page: number | null;
  @IsArray()
  pages: T;
  @IsString()
  filter_search: string;
  @IsString()
  filter_fields: string;
  @IsString()
  @IsEnum(OrderBy)
  order_by_type: 'asc' | 'desc';
  @IsString()
  order_by_field: string;
}
