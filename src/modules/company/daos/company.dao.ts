import { Injectable } from '@nestjs/common';
import { CreateDAO } from './create.dao';
import { CompanyEntity } from '../company.entity';

@Injectable()
export class CompanyDAO {
  constructor(private readonly createDAO: CreateDAO) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    return await this.createDAO.execute(company);
  }
}
