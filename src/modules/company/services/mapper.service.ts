import { Injectable } from '@nestjs/common';
import { CompanyEntity } from '../company.entity';
import { CompanyDTO } from '../company.dto';

@Injectable()
export class MapperService {
  static fromEntityToDTO(company: CompanyEntity): CompanyDTO {
    const { address, ...rest } = company;
    return {
      id: rest.id!,
      cnpj: rest.cnpj,
      code: rest.code,
      name: rest.name,
      created_at: rest.created_at,
      updated_at: rest.updated_at,
      address: {
        id: address!.id!,
        cep: address!.cep,
        street: address!.street,
        neighborhood: address!.neighborhood,
        city: address!.city,
        state: address!.state,
        uf: address!.uf,
        number: address!.number,
        created_at: address!.created_at,
        updated_at: address!.updated_at,
      },
    };
  }
}
