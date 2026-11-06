import { Injectable } from '@nestjs/common';
import { FullCompanyEntity } from './company.entity';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { CompanyDao } from './daos/company.dao';
import { CompanyDto } from './company.dto';

@Injectable()
abstract class CompanyContract {
  abstract create(company: FullCompanyEntity): Promise<FullCompanyEntity>;
  abstract update(
    id: string,
    company: FullCompanyEntity,
  ): Promise<FullCompanyEntity>;
  abstract delete(id: string): Promise<FullCompanyEntity>;
  abstract findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDto[]>>;
  abstract findById(id: string): Promise<FullCompanyEntity>;
}

@Injectable()
export class CompanyRepository implements CompanyContract {
  constructor(private readonly companyDao: CompanyDao) {}

  async create(company: FullCompanyEntity): Promise<FullCompanyEntity> {
    return this.companyDao.create(company);
  }

  async update(
    id: string,
    company: FullCompanyEntity,
  ): Promise<FullCompanyEntity> {
    return this.companyDao.update(id, company);
  }

  async delete(id: string): Promise<FullCompanyEntity> {
    return this.companyDao.delete(id);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDto[]>> {
    return await this.companyDao.findAll(pagination);
  }

  async findById(id: string): Promise<FullCompanyEntity> {
    return this.companyDao.findById(id);
  }
}
