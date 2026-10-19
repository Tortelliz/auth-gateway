import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleDAO } from './daos/role.dao';

@Injectable()
abstract class RoleContract {
  abstract create(role: RoleEntity): Promise<RoleEntity>;
  abstract update(id: string, role: RoleEntity): Promise<RoleEntity>;
  abstract delete(id: string): Promise<RoleEntity>;
  abstract findAll(): Promise<RoleEntity[]>;
  abstract findById(id: string): Promise<RoleEntity>;
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
  async findAll(): Promise<RoleEntity[]> {
    return await this.roleDAO.findAll();
  }
  async findById(id: string): Promise<RoleEntity> {
    return await this.roleDAO.findById(id);
  }
}
