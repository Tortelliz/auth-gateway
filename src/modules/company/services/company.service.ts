import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { CompanyDTO, CreateCompanyDTO, UpdateCompanyDTO } from '../company.dto';
import { FindAllService } from './find-all.service';
import { UpdateService } from './update.service';
import { FindByIdService } from './find-by-id.service';
import { DeleteService } from './delete.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly createService: CreateService,
    private readonly findAllService: FindAllService,
    private readonly updateService: UpdateService,
    private readonly findByIdService: FindByIdService,
    private readonly deleteService: DeleteService,
  ) {}

  async create(company: CreateCompanyDTO): Promise<CompanyDTO> {
    return await this.createService.execute(company);
  }

  async findAll(): Promise<CompanyDTO[]> {
    return await this.findAllService.execute();
  }

  async findById(id: string): Promise<CompanyDTO> {
    return await this.findByIdService.execute(id);
  }

  async update(id: string, company: UpdateCompanyDTO): Promise<CompanyDTO> {
    return await this.updateService.execute(id, company);
  }

  async delete(id: string): Promise<CompanyDTO> {
    return await this.deleteService.execute(id);
  }
}
