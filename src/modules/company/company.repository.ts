import { CompanyEntity } from './company.entity';
import { Injectable } from '@nestjs/common';
import { CompanyDAO } from './daos/company.dao';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { Company, CompanyAddress } from '../../../generated/prisma/client';

@Injectable()
abstract class CompanyContract {
  abstract create(
    company: Company & { address: CompanyAddress },
  ): Promise<Company & { address: CompanyAddress }>;
  abstract findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyEntity[]>>;
  abstract findById(id: string): Promise<Company & { address: CompanyAddress }>;
  abstract update(
    id: string,
    company: Company & { address: CompanyAddress },
  ): Promise<Company & { address: CompanyAddress }>;
  abstract delete(id: string): Promise<CompanyEntity>;
}

@Injectable()
export class CompanyRepository implements CompanyContract {
  constructor(private readonly companyDAO: CompanyDAO) {}

  async create(
    company: Company & { address: CompanyAddress },
  ): Promise<Company & { address: CompanyAddress }> {
    return await this.companyDAO.create(company);
  }
  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyEntity[]>> {
    return await this.companyDAO.findAll(pagination);
  }
  async findById(id: string): Promise<Company & { address: CompanyAddress }> {
    return await this.companyDAO.findById(id);
  }
  async update(
    id: string,
    company: Company & { address: CompanyAddress },
  ): Promise<Company & { address: CompanyAddress }> {
    return await this.companyDAO.update(id, company);
  }
  async delete(id: string): Promise<CompanyEntity> {
    return await this.companyDAO.delete(id);
  }
}
