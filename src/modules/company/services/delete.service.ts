import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDTO } from '../company.dto';
import { MapperService } from './mapper.service';

@Injectable()
export class DeleteService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<CompanyDTO> {
    const deletedCompany = await this.companyRepository.delete(id);
    return MapperService.fromEntityToDTO(deletedCompany);
  }
}
