import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyEntity } from './company.entity';
import { CompanyDTO } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() company: CompanyDTO): Promise<CompanyEntity> {
    try {
      return await this.companyService.create(company);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
