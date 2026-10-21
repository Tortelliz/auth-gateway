import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { CompanyDTO, CreateCompanyDTO, UpdateCompanyDTO } from './company.dto';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { CompanyEntity } from './company.entity';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() company: CreateCompanyDTO): Promise<CompanyDTO> {
    return await this.companyService.create(company);
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyEntity[]>> {
    return await this.companyService.findAll(pagination);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<CompanyDTO> {
    return await this.companyService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() company: UpdateCompanyDTO,
  ): Promise<CompanyDTO> {
    return await this.companyService.update(id, company);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<CompanyDTO> {
    return await this.companyService.delete(id);
  }
}
