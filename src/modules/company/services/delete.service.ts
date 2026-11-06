import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDto } from '../company.dto';
import { CompanyMapper } from '../company.mapper';

@Injectable()
export class DeleteService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: string): Promise<CompanyDto> {
    return CompanyMapper.fromEntityToDto(
      await this.companyRepository.delete(id),
    );
  }
}
