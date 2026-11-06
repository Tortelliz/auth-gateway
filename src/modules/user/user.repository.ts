import { Injectable } from '@nestjs/common';
import { FullUserEntity } from './user.entity';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { UserDto } from './user.dto';
import { UserDao } from './daos/user.dao';

@Injectable()
abstract class UserContract {
  abstract create(user: FullUserEntity): Promise<FullUserEntity>;
  abstract update(id: string, user: FullUserEntity): Promise<FullUserEntity>;
  abstract delete(id: string): Promise<FullUserEntity>;
  abstract findById(id: string): Promise<FullUserEntity>;
  abstract findByEmail(email: string): Promise<FullUserEntity>;
  abstract findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>>;
}

@Injectable()
export class UserRepository implements UserContract {
  constructor(private readonly userDao: UserDao) {}

  async create(user: FullUserEntity): Promise<FullUserEntity> {
    return this.userDao.create(user);
  }

  async update(id: string, user: FullUserEntity): Promise<FullUserEntity> {
    return this.userDao.update(id, user);
  }

  async delete(id: string): Promise<FullUserEntity> {
    return this.userDao.delete(id);
  }

  async findById(id: string): Promise<FullUserEntity> {
    return this.userDao.findById(id);
  }

  async findByEmail(email: string): Promise<FullUserEntity> {
    return this.userDao.findByEmail(email);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return this.userDao.findAll(pagination);
  }
}
