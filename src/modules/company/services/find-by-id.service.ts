import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDTO } from '../company.dto';
import { MapperService } from './mapper.service';

@Injectable()
export class FindByIdService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<CompanyDTO> {
    const company = await this.companyRepository.findById(id);
    return MapperService.fromEntityToDTO(company);
  }
}
