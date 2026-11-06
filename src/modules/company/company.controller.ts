import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { ApiDefaultResponse } from '../../lib/swagger/api-response.decorator';
import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @ApiDefaultResponse(CompanyDto, false, HttpStatus.CREATED)
  async create(@Body() company: CreateCompanyDto): Promise<CompanyDto> {
    return await this.companyService.create(company);
  }

  @Put(':id')
  @ApiDefaultResponse(CompanyDto)
  async update(
    @Param('id') id: string,
    @Body() company: UpdateCompanyDto,
  ): Promise<CompanyDto> {
    return await this.companyService.update(id, company);
  }

  @Delete(':id')
  @ApiDefaultResponse(CompanyDto)
  async delete(@Param('id') id: string): Promise<CompanyDto> {
    return await this.companyService.delete(id);
  }

  @Get(':id')
  @ApiDefaultResponse(CompanyDto)
  async findOne(@Param('id') id: string): Promise<CompanyDto> {
    return await this.companyService.findOne(id);
  }

  @Get()
  @ApiDefaultResponse(PaginationResponseDTO<CompanyDto[]>)
  async findAll(
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDto[]>> {
    return await this.companyService.findAll(pagination);
  }
}
