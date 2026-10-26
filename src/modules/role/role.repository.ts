import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleDAO } from './daos/role.dao';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';

@Injectable()
abstract class RoleContract {
  abstract create(role: RoleEntity): Promise<RoleEntity>;
  abstract update(id: string, role: RoleEntity): Promise<RoleEntity>;
  abstract delete(id: string): Promise<RoleEntity>;
  abstract findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleEntity[]>>;
  abstract findById(id: string): Promise<RoleEntity>;
  abstract findByUserId(id: string): Promise<{ role: RoleEntity }[]>;
}

@Injectable()
export class RoleRepository implements RoleContract {
  constructor(private readonly roleDAO: RoleDAO) {}

  async create(role: RoleEntity): Promise<RoleEntity> {
    return await this.roleDAO.create(role);
  }
  async update(id: string, role: RoleEntity): Promise<RoleEntity> {
    return await this.roleDAO.update(id, role);
  }
  async delete(id: string): Promise<RoleEntity> {
    return await this.roleDAO.delete(id);
  }
  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleEntity[]>> {
    return await this.roleDAO.findAll(pagination);
  }
  async findById(id: string): Promise<RoleEntity> {
    return await this.roleDAO.findById(id);
  }

  async findByUserId(id: string): Promise<{ role: RoleEntity }[]> {
    return await this.roleDAO.findByUserId(id);
  }
}
