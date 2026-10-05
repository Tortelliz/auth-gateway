import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyEntity } from '../company.entity';
import { CompanyDTO } from '../company.dto';

@Injectable()
export class CreateService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: CompanyDTO): Promise<CompanyEntity> {
    const buildedCompany = this.build(company);
    return await this.companyRepository.create(buildedCompany);
  }

  private build(company: CompanyDTO): CompanyEntity {
    return {
      ...company,
      created_at: new Date(),
    };
  }
}
