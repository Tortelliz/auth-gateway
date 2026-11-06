import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { CompanyDto } from '../company.dto';

@Injectable()
export class FindAllService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDto[]>> {
    return await this.companyRepository.findAll(pagination);
  }
}
