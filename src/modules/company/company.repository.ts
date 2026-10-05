import { CompanyEntity } from './company.entity';
import { Injectable } from '@nestjs/common';
import { CreateDAO } from './daos/create.dao';

abstract class CompanyContract {
  abstract create(company: CompanyEntity): Promise<CompanyEntity>;
  abstract findAll(): Promise<CompanyEntity[]>;
  abstract findById(id: string): Promise<CompanyEntity>;
  abstract update(company: CompanyEntity): Promise<CompanyEntity>;
  abstract delete(id: string): Promise<CompanyEntity>;
}

@Injectable()
export class CompanyRepository implements CompanyContract {
  constructor(private readonly createDAO: CreateDAO) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    return await this.createDAO.execute(company);
  }
  async findAll(): Promise<CompanyEntity[]> {
    throw Error('Not implemented');
  }
  async findById(id: string): Promise<CompanyEntity> {
    throw Error('Not implemented');
  }
  async update(company: CompanyEntity): Promise<CompanyEntity> {
    throw Error('Not implemented');
  }
  async delete(id: string): Promise<CompanyEntity> {
    throw Error('Not implemented');
  }
}
