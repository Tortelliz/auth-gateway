import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { UpdateService } from './update.service';
import { DeleteService } from './delete.service';
import { FindAllService } from './find-all.service';
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from '../role.dto';
import { FindByIdService } from './find-by-id.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { FindByUserIdService } from './find-by-user-id.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
    private readonly findAllService: FindAllService,
    private readonly findByIdService: FindByIdService,
    private readonly findByUserIdService: FindByUserIdService,
  ) {}

  async create(role: CreateRoleDTO): Promise<RoleDTO> {
    return await this.createService.execute(role);
  }

  async update(id: string, role: UpdateRoleDTO): Promise<RoleDTO> {
    return await this.updateService.execute(id, role);
  }

  async delete(id: string): Promise<RoleDTO> {
    return await this.deleteService.execute(id);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleDTO[]>> {
    return await this.findAllService.execute(pagination);
  }

  async findById(id: string): Promise<RoleDTO> {
    return await this.findByIdService.execute(id);
  }

  async findByUserId(id: string): Promise<{ role: RoleDTO }[]> {
    return await this.findByUserIdService.execute(id);
  }
}
