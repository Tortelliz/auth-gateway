import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDto, CreateCompanyDto } from '../company.dto';
import { FullCompanyEntity } from '../company.entity';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { CompanyMapper } from '../company.mapper';

@Injectable()
export class CreateService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: CreateCompanyDto): Promise<CompanyDto> {
    return CompanyMapper.fromEntityToDto(
      await this.companyRepository.create(this.build(company)),
    );
  }

  private build(company: CreateCompanyDto): FullCompanyEntity {
    const companyId = generateUUIDUtil();
    const now = new Date();
    return {
      id: companyId,
      cnpj: company.cnpj,
      code: company.code,
      name: company.name,
      created_at: now,
      updated_at: null,
      address: {
        ...company.address,
        id: generateUUIDUtil(),
        company_id: companyId,
        created_at: now,
        updated_at: null,
      },
    };
  }
}
