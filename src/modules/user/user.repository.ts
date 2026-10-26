import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { UserDTO } from './user.dto';
import { UserDAO } from './daos/user.dao';

@Injectable()
abstract class UserContract {
  abstract create(role: UserEntity): Promise<UserEntity>;
  abstract update(id: string, role: UserEntity): Promise<UserEntity>;
  abstract delete(id: string): Promise<UserEntity>;
  abstract findAllByCompanyId(
    companyId: string,
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDTO[]>>;
  abstract findById(id: string): Promise<UserEntity>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract deactivate(id: string): Promise<UserEntity>;
  abstract addLoginFailAttempt(id: string): Promise<UserEntity>;
  abstract setMustChangePassword(id: string): Promise<UserEntity>;
  abstract findPasswordByEmail(
    email: string,
  ): Promise<{ password: string } | null>;
  abstract setPassword(userId: string, password: string): Promise<UserEntity>;
  abstract resetPasswordFailsAttempts(id: string): Promise<UserEntity>;
}

@Injectable()
export class UserRepository implements UserContract {
  constructor(private readonly userDAO: UserDAO) {}

  async create(role: UserEntity): Promise<UserEntity> {
    return await this.userDAO.create(role);
  }
  async update(id: string, role: UserEntity): Promise<UserEntity> {
    return await this.userDAO.update(id, role);
  }
  async delete(id: string): Promise<UserEntity> {
    return await this.userDAO.delete(id);
  }
  async findAllByCompanyId(
    companyId: string,
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDTO[]>> {
    return await this.userDAO.findAllByCompanyId(companyId, pagination);
  }
  async findById(id: string): Promise<UserEntity> {
    return await this.userDAO.findById(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userDAO.findByEmail(email);
  }

  async deactivate(id: string): Promise<UserEntity> {
    return await this.userDAO.deactivate(id);
  }

  async addLoginFailAttempt(id: string): Promise<UserEntity> {
    return await this.userDAO.addLoginFailAttempt(id);
  }

  async setMustChangePassword(id: string): Promise<UserEntity> {
    return await this.userDAO.setMustChangePassword(id);
  }

  async findPasswordByEmail(
    email: string,
  ): Promise<{ password: string } | null> {
    return await this.userDAO.findPasswordByEmail(email);
  }

  async setPassword(userId: string, password: string): Promise<UserEntity> {
    return await this.userDAO.setPassword(userId, password);
  }

  async resetPasswordFailsAttempts(id: string): Promise<UserEntity> {
    return await this.userDAO.resetLoginFailsAttempts(id);
  }
}
