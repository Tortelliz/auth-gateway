import { Injectable } from '@nestjs/common';
import { CreateDao } from './create.dao';
import { FullCompanyEntity } from '../company.entity';
import { UpdateDao } from './update.dao';
import { FindByIdDao } from './find-by-id.dao';
import { DeleteDao } from './delete.dao';
import { FindAllDao } from './find-all.dao';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { CompanyDto } from '../company.dto';

@Injectable()
export class CompanyDao {
  constructor(
    private readonly createDao: CreateDao,
    private readonly updateDao: UpdateDao,
    private readonly findByIdDao: FindByIdDao,
    private readonly deleteDao: DeleteDao,
    private readonly findAllDao: FindAllDao,
  ) {}

  async create(company: FullCompanyEntity): Promise<FullCompanyEntity> {
    return await this.createDao.execute(company);
  }

  async update(
    id: string,
    company: FullCompanyEntity,
  ): Promise<FullCompanyEntity> {
    return await this.updateDao.execute(id, company);
  }

  async delete(id: string): Promise<FullCompanyEntity> {
    return await this.deleteDao.execute(id);
  }

  async findById(id: string): Promise<FullCompanyEntity> {
    return await this.findByIdDao.execute(id);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDto[]>> {
    return await this.findAllDao.execute(pagination);
  }
}
