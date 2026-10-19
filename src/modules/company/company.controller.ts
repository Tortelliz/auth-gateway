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
    try {
      return await this.companyService.create(company);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(
    @Query() query: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyEntity[]>> {
    try {
      return await this.companyService.findAll(query);
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
