import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { UpdateService } from './update.service';
import { DeleteService } from './delete.service';
import { FindAllService } from './find-all.service';
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from '../role.dto';
import { FindByIdService } from './find-by-id.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
    private readonly findAllService: FindAllService,
    private readonly findByIdService: FindByIdService,
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

  async findAll(): Promise<RoleDTO[]> {
    return await this.findAllService.execute();
  }

  async findById(id: string): Promise<RoleDTO> {
    return await this.findByIdService.execute(id);
  }
}
