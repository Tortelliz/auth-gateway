import { ForbiddenException, Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDto, UpdateCompanyDto } from '../company.dto';
import { FullCompanyEntity } from '../company.entity';
import { isEqualService } from '../../../lib/lodash/is-equal.service';
import { CompanyMapper } from '../company.mapper';

@Injectable()
export class UpdateService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string, company: UpdateCompanyDto): Promise<CompanyDto> {
    const oldCompany = await this.companyRepository.findById(id);
    this.checkChange(oldCompany, company);
    return CompanyMapper.fromEntityToDto(
      await this.companyRepository.update(id, this.build(oldCompany, company)),
    );
  }

  private build(
    oldCompany: FullCompanyEntity,
    newCompany: UpdateCompanyDto,
  ): FullCompanyEntity {
    const now = new Date();
    return {
      id: oldCompany.id,
      cnpj: newCompany.cnpj,
      code: newCompany.code,
      name: newCompany.name,
      created_at: oldCompany.created_at,
      updated_at: now,
      address: oldCompany.address &&
        newCompany.address && {
          id: oldCompany.address.id,
          company_id: oldCompany.id,
          cep: newCompany.address.cep,
          street: newCompany.address.street,
          neighborhood: newCompany.address.neighborhood,
          city: newCompany.address.city,
          state: newCompany.address.state,
          uf: newCompany.address.uf,
          number: newCompany.address.number,
          created_at: oldCompany.address.created_at,
          updated_at: now,
        },
    };
  }

  private checkChange(
    oldCompany: FullCompanyEntity,
    newCompany: UpdateCompanyDto,
  ): void {
    const isEqual = isEqualService(
      CompanyMapper.fromEntityToUpdateDto(oldCompany),
      newCompany,
    );
    if (isEqual) throw new ForbiddenException('Changes not detected');
  }
}
