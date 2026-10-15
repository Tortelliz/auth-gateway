import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../company.repository';
import { CompanyDTO } from '../company.dto';

@Injectable()
export class FindAllService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyDTO[]> {
    return await this.companyRepository.findAll();
  }
}
