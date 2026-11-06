import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../../generated/prisma/client';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { RoleDao } from './daos/role.dao';

@Injectable()
abstract class RoleContract {
  abstract create(role: RoleEntity): Promise<RoleEntity>;
  abstract update(id: string, role: RoleEntity): Promise<RoleEntity>;
  abstract delete(id: string): Promise<RoleEntity>;
  abstract findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleEntity[]>>;
  abstract findById(id: string): Promise<RoleEntity>;
  abstract findByUserId(userId: string): Promise<RoleEntity[]>;
}

@Injectable()
export class RoleRepository implements RoleContract {
  constructor(private readonly roleDao: RoleDao) {}

  async create(role: RoleEntity): Promise<RoleEntity> {
    return this.roleDao.create(role);
  }

  async update(id: string, role: RoleEntity): Promise<RoleEntity> {
    return this.roleDao.update(id, role);
  }

  async delete(id: string): Promise<RoleEntity> {
    return this.roleDao.delete(id);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleEntity[]>> {
    return await this.roleDao.findAll(pagination);
  }

  async findById(id: string): Promise<RoleEntity> {
    return this.roleDao.findById(id);
  }

  async findByUserId(userId: string): Promise<RoleEntity[]> {
    return this.roleDao.findByUserId(userId);
  }
}
