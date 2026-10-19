import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { CompanyEntity } from '../company.entity';

@Injectable()
export class FindAllService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyEntity[]>> {
    return await this.companyRepository.findAll(pagination);
  }
}
