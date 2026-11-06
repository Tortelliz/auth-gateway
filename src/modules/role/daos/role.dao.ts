import { Injectable } from '@nestjs/common';
import { CreateDao } from './create.dao';
import { UpdateDao } from './update.dao';
import { DeleteDao } from './delete.dao';
import { FindAllDao } from './find-all.dao';
import { FindByIdDao } from './find-by-id.dao';
import { RoleEntity } from '../../../../generated/prisma/client';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { FindByUserIdDao } from './find-by-user-id.dao';

@Injectable()
export class RoleDao {
  constructor(
    private readonly createDao: CreateDao,
    private readonly updateDao: UpdateDao,
    private readonly deleteDao: DeleteDao,
    private readonly findAllDao: FindAllDao,
    private readonly findByIdDao: FindByIdDao,
    private readonly findByUserIdDao: FindByUserIdDao,
  ) {}

  async create(role: RoleEntity): Promise<RoleEntity> {
    return await this.createDao.execute(role);
  }

  async delete(id: string): Promise<RoleEntity> {
    return await this.deleteDao.execute(id);
  }

  async update(id: string, role: RoleEntity): Promise<RoleEntity> {
    return await this.updateDao.execute(id, role);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleEntity[]>> {
    return await this.findAllDao.execute(pagination);
  }

  async findById(id: string): Promise<RoleEntity> {
    return await this.findByIdDao.execute(id);
  }

  async findByUserId(userId: string): Promise<RoleEntity[]> {
    return await this.findByUserIdDao.execute(userId);
  }
}
