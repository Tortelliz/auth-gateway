import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
  items: number;
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
  @ApiProperty({ type: 'array', items: { type: 'object' } })
  pages: T;
  @IsObject()
  filter:
    | {
        OR: {
          [p: string]: {
            contains: string | undefined;
            mode: string;
          };
        }[];
      }
    | {
        OR?: undefined;
      };
  @IsArray()
  order_by:
    | {
        created_at: 'desc';
      }[]
    | {
        [x: string]: 'asc' | 'desc';
      };
}
