import { Injectable } from '@nestjs/common';
import { CreateDao } from './create.dao';
import { FullUserEntity } from '../user.entity';
import { UpdateDao } from './update.dao';
import { DeleteDao } from './delete.dao';
import { FindAllDao } from './find-all.dao';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { UserDto } from '../user.dto';
import { FindByEmailDao } from './find-by-email.dao';
import { FindByIdDao } from './find-by-id.dao';

@Injectable()
export class UserDao {
  constructor(
    private readonly createDao: CreateDao,
    private readonly updateDao: UpdateDao,
    private readonly deleteDao: DeleteDao,
    private readonly findAllDao: FindAllDao,
    private readonly findByEmailDao: FindByEmailDao,
    private readonly findByIdDao: FindByIdDao,
  ) {}

  async create(user: FullUserEntity): Promise<FullUserEntity> {
    return await this.createDao.execute(user);
  }

  async update(id: string, user: FullUserEntity): Promise<FullUserEntity> {
    return await this.updateDao.execute(id, user);
  }

  async delete(id: string): Promise<FullUserEntity> {
    return await this.deleteDao.execute(id);
  }

  async findAll(
    companyId: string,
    pagination: PaginationRequestDTO,
    omitUserId: string,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return await this.findAllDao.execute(companyId, pagination, omitUserId);
  }

  async findByEmail(email: string): Promise<FullUserEntity> {
    return await this.findByEmailDao.execute(email);
  }

  async findById(id: string): Promise<FullUserEntity> {
    return await this.findByIdDao.execute(id);
  }
}
