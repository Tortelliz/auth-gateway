import { CompanyRepository } from '../company.repository';
import { CompanyDTO, UpdateCompanyDTO } from '../company.dto';
import { CompanyEntity } from '../company.entity';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { Company, CompanyAddress } from '../../../../generated/prisma/client';
import { isEqual } from 'lodash';

@Injectable()
export class UpdateService {
  private readonly logger = new Logger(UpdateService.name);
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string, company: UpdateCompanyDTO): Promise<CompanyDTO> {
    const oldCompany = await this.companyRepository.findById(id);
    const isChange = this.checkIsChange(oldCompany, company);
    if (!isChange) throw new ForbiddenException('Changes not detected');
    const builtCompany = this.build(oldCompany, company);
    const updatedCompany = await this.companyRepository.update(
      id,
      builtCompany,
    );
    return MapperService.fromEntityToDTO(updatedCompany);
  }

  private build(
    oldCompany: Company & { address: CompanyAddress },
    newCompany: UpdateCompanyDTO,
  ): Company & { address: CompanyAddress } {
    const timestamp = new Date();
    return {
      ...newCompany,
      id: oldCompany.id,
      created_at: oldCompany.created_at,
      updated_at: timestamp,
      address: {
        ...newCompany.address,
        id: oldCompany.address.id,
        company_id: oldCompany.id,
        created_at: oldCompany.created_at,
        updated_at: timestamp,
      },
    };
  }

  private checkIsChange(
    oldCompany: CompanyEntity,
    newCompany: UpdateCompanyDTO,
  ): boolean {
    const mappedOldCompany: UpdateCompanyDTO = {
      cnpj: oldCompany.cnpj,
      code: oldCompany.code,
      name: oldCompany.name,
      address: {
        cep: oldCompany.address!.cep,
        street: oldCompany.address!.street,
        neighborhood: oldCompany.address!.neighborhood,
        city: oldCompany.address!.city,
        state: oldCompany.address!.state,
        uf: oldCompany.address!.uf,
        number: oldCompany.address!.number,
      },
    };
    return !isEqual(mappedOldCompany, newCompany);
  }
}
