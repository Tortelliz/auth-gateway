import { CompanyRepository } from '../company.repository';
import { CompanyDTO, UpdateCompanyDTO } from '../company.dto';
import { CompanyEntity } from '../company.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string, company: UpdateCompanyDTO): Promise<CompanyDTO> {
    const builtCompany = await this.build(id, company);
    return await this.companyRepository.update(id, builtCompany);
  }

  private async build(
    id: string,
    newCompany: UpdateCompanyDTO,
  ): Promise<CompanyEntity> {
    const oldCompany = await this.companyRepository.findById(id);
    return {
      ...newCompany,
      created_at: oldCompany.created_at,
      address: {
        ...newCompany.address,
        created_at: oldCompany.created_at,
      },
    };
  }
}
