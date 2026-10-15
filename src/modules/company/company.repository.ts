import { CompanyEntity } from './company.entity';
import { Injectable } from '@nestjs/common';
import { CompanyDAO } from './daos/company.dao';

abstract class CompanyContract {
  abstract create(company: CompanyEntity): Promise<CompanyEntity>;
  abstract findAll(): Promise<CompanyEntity[]>;
  abstract findById(id: string): Promise<CompanyEntity>;
  abstract update(id: string, company: CompanyEntity): Promise<CompanyEntity>;
  abstract delete(id: string): Promise<CompanyEntity>;
}

@Injectable()
export class CompanyRepository implements CompanyContract {
  constructor(private readonly companyDAO: CompanyDAO) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    return await this.companyDAO.create(company);
  }
  async findAll(): Promise<CompanyEntity[]> {
    return await this.companyDAO.findAll();
  }
  async findById(id: string): Promise<CompanyEntity> {
    return await this.companyDAO.findById(id);
  }
  async update(id: string, company: CompanyEntity): Promise<CompanyEntity> {
    return await this.companyDAO.update(id, company);
  }
  async delete(id: string): Promise<CompanyEntity> {
    return await this.companyDAO.delete(id);
  }
}
