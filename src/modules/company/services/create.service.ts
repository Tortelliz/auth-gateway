import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyEntity } from '../company.entity';
import { CompanyDTO, CreateCompanyDTO } from '../company.dto';
import { MapperService } from './mapper.service';

@Injectable()
export class CreateService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: CreateCompanyDTO): Promise<CompanyDTO> {
    const builtCompany = this.build(company);
    const createdCompany = await this.companyRepository.create(builtCompany);
    return MapperService.fromEntityToDTO(createdCompany);
  }

  private build(company: CreateCompanyDTO): CompanyEntity {
    const timestamp = new Date();
    return {
      ...company,
      created_at: timestamp,
      address: {
        ...company.address,
        created_at: timestamp,
      },
    };
  }
}
