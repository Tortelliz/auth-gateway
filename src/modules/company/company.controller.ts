import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { ApiDefaultResponse } from '../../infra/swagger/api-response.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiDefaultResponse(CompanyDTO, false, HttpStatus.CREATED)
  async create(@Body() company: CreateCompanyDTO): Promise<CompanyDTO> {
    return await this.companyService.create(company);
  }

  @Get()
  @ApiDefaultResponse(PaginationResponseDTO<CompanyDTO[]>)
  async findAll(
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDTO[]>> {
    return await this.companyService.findAll(pagination);
  }

  @Get(':id')
  @ApiDefaultResponse(CompanyDTO)
  async findById(@Param('id') id: string): Promise<CompanyDTO> {
    return await this.companyService.findById(id);
  }

  @Put(':id')
  @ApiDefaultResponse(CompanyDTO)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() company: UpdateCompanyDTO,
  ): Promise<CompanyDTO> {
    return await this.companyService.update(id, company);
  }

  @Delete(':id')
  @ApiDefaultResponse(CompanyDTO)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<CompanyDTO> {
    return await this.companyService.delete(id);
  }
}
