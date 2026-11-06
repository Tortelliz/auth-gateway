import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from '../company.dto';
import { UpdateService } from './update.service';
import { DeleteService } from './delete.service';
import { FindOneService } from './find-one.service';
import { FindAllService } from './find-all.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
    private readonly findOneService: FindOneService,
    private readonly findAllService: FindAllService,
  ) {}

  async create(company: CreateCompanyDto): Promise<CompanyDto> {
    return await this.createService.execute(company);
  }

  async update(id: string, company: UpdateCompanyDto): Promise<CompanyDto> {
    return await this.updateService.execute(id, company);
  }

  async delete(id: string): Promise<CompanyDto> {
    return await this.deleteService.execute(id);
  }

  async findOne(id: string): Promise<CompanyDto> {
    return await this.findOneService.execute(id);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<CompanyDto[]>> {
    return await this.findAllService.execute(pagination);
  }
}
