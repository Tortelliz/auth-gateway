import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { CompanyEntity } from '../company.entity';
import { CompanyDTO } from '../company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly createService: CreateService) {}

  async create(company: CompanyDTO): Promise<CompanyEntity> {
    return await this.createService.execute(company);
  }
}
