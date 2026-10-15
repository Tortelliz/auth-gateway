import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDTO } from '../company.dto';

@Injectable()
export class DeleteService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<CompanyDTO> {
    return await this.companyRepository.delete(id);
  }
}
