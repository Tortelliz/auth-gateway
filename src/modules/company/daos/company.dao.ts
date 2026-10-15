import { Injectable } from '@nestjs/common';
import { CreateDAO } from './create.dao';
import { CompanyEntity } from '../company.entity';
import { FindAllDAO } from './find-all.dao';
import { UpdateDAO } from './update.dao';
import { FindByIdDAO } from './find-by-id.dao';
import { DeleteDAO } from './delete.dao';

@Injectable()
export class CompanyDAO {
  constructor(
    private readonly createDAO: CreateDAO,
    private readonly findAllDAO: FindAllDAO,
    private readonly updateDAO: UpdateDAO,
    private readonly findByIdDAO: FindByIdDAO,
    private readonly deleteDAO: DeleteDAO,
  ) {}

  async create(company: CompanyEntity): Promise<CompanyEntity> {
    return await this.createDAO.execute(company);
  }

  async findAll(): Promise<CompanyEntity[]> {
    return await this.findAllDAO.execute();
  }

  async update(id: string, company: CompanyEntity): Promise<CompanyEntity> {
    return await this.updateDAO.execute(id, company);
  }

  async findById(id: string): Promise<CompanyEntity> {
    return await this.findByIdDAO.execute(id);
  }

  async delete(id: string): Promise<CompanyEntity> {
    return await this.deleteDAO.execute(id);
  }
}
