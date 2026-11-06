import { FullCompanyEntity } from './company.entity';
import { CompanyDto, UpdateCompanyDto } from './company.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyMapper {
  static fromEntityToDto(company: FullCompanyEntity): CompanyDto {
    return {
      id: company.id,
      cnpj: company.cnpj,
      code: company.code,
      name: company.name,
      created_at: company.created_at,
      updated_at: company.updated_at,
      address: company.address && {
        id: company.address.id,
        cep: company.address.cep,
        street: company.address.street,
        neighborhood: company.address.neighborhood,
        city: company.address.city,
        state: company.address.state,
        uf: company.address.uf,
        number: company.address.number,
        created_at: company.address.created_at,
        updated_at: company.address.updated_at,
      },
    };
  }

  static fromEntityToUpdateDto(company: FullCompanyEntity): UpdateCompanyDto {
    return {
      cnpj: company.cnpj,
      code: company.code,
      name: company.name,
      address: {
        cep: company.address!.cep,
        street: company.address!.street,
        neighborhood: company.address!.neighborhood,
        city: company.address!.city,
        state: company.address!.state,
        uf: company.address!.uf,
        number: company.address!.number,
      },
    };
  }
}
