import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyDTO, CreateCompanyDTO, UpdateCompanyDTO } from './company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() company: CreateCompanyDTO): Promise<CompanyDTO> {
    try {
      return await this.companyService.create(company);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(): Promise<CompanyDTO[]> {
    try {
      return await this.companyService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CompanyDTO> {
    try {
      return await this.companyService.findById(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() company: UpdateCompanyDTO,
  ): Promise<CompanyDTO> {
    try {
      return await this.companyService.update(id, company);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<CompanyDTO> {
    try {
      return await this.companyService.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
