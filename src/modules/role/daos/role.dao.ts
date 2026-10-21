import { Injectable } from '@nestjs/common';
import { CreateDAO } from './create.dao';
import { UpdateDAO } from './update.dao';
import { DeleteDAO } from './delete.dao';
import { FindAllDAO } from './find-all.dao';
import { RoleEntity } from '../role.entity';
import { FindByIdDAO } from './find-by-id.dao';
import { PaginationRequestDTO, PaginationResponseDTO } from '../../../common/pagination/pagination.dto';

@Injectable()
export class RoleDAO {
  constructor(
    private readonly createDAO: CreateDAO,
    private readonly updateDAO: UpdateDAO,
    private readonly deleteDAO: DeleteDAO,
    private readonly findAllDAO: FindAllDAO,
    private readonly findByIdDAO: FindByIdDAO,
  ) {}

  async create(role: RoleEntity): Promise<RoleEntity> {
    return await this.createDAO.execute(role);
  }

  async update(id: string, role: RoleEntity): Promise<RoleEntity> {
    return await this.updateDAO.execute(id, role);
  }

  async delete(id: string): Promise<RoleEntity> {
    return await this.deleteDAO.execute(id);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleEntity[]>> {
    return await this.findAllDAO.execute(pagination);
  }

  async findById(id: string): Promise<RoleEntity> {
    return await this.findByIdDAO.execute(id);
  }
}
