import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDTO, CreateCompanyDTO } from '../company.dto';
import { MapperService } from './mapper.service';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { Company, CompanyAddress } from '../../../../generated/prisma/client';

@Injectable()
export class CreateService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: CreateCompanyDTO): Promise<CompanyDTO> {
    const builtCompany = this.build(company);
    const createdCompany = await this.companyRepository.create(builtCompany);
    return MapperService.fromEntityToDTO(createdCompany);
  }

  private build(
    company: CreateCompanyDTO,
  ): Company & { address: CompanyAddress } {
    const timestamp = new Date();
    const companyId = generateUUIDUtil();
    return {
      ...company,
      id: companyId,
      created_at: timestamp,
      updated_at: null,
      address: {
        ...company.address,
        id: generateUUIDUtil(),
        company_id: companyId,
        created_at: timestamp,
        updated_at: null,
      },
    };
  }
}
