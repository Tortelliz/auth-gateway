import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateRoleDto, RoleDto, UpdateRoleDto } from '../role.dto';
import { UpdateService } from './update.service';
import { DeleteService } from './delete.service';
import { FindAllService } from './find-all.service';
import { FindOneService } from './find-one.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
    private readonly findAllService: FindAllService,
    private readonly findOneService: FindOneService,
  ) {}

  async create(role: CreateRoleDto): Promise<RoleDto> {
    return await this.createService.execute(role);
  }

  async update(id: string, role: UpdateRoleDto): Promise<RoleDto> {
    return await this.updateService.execute(id, role);
  }

  async delete(id: string): Promise<RoleDto> {
    return await this.deleteService.execute(id);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleDto[]>> {
    return await this.findAllService.execute(pagination);
  }

  async findOne(id: string): Promise<RoleDto> {
    return await this.findOneService.execute(id);
  }
}
