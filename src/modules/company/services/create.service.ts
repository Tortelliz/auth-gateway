import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyEntity } from '../company.entity';
import { CompanyDTO, CreateCompanyDTO } from '../company.dto';

@Injectable()
export class CreateService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: CreateCompanyDTO): Promise<CompanyDTO> {
    const builtCompany = this.build(company);
    return await this.companyRepository.create(builtCompany);
  }

  private build(company: CreateCompanyDTO): CompanyEntity {
    return {
      ...company,
      created_at: new Date(),
    };
  }
}
