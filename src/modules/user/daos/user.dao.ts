import { Injectable } from '@nestjs/common';
import { CreateDAO } from './create.dao';
import { UpdateDAO } from './update.dao';
import { DeleteDAO } from './delete.dao';
import { FindByIdDAO } from './find-by-id.dao';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { FindAllByCompanyIdDAO } from './find-all-by-company-id.dao';
import { FindByEmailDAO } from './find-by-email.dao';
import { UserEntity } from '../user.entity';
import { UserDTO } from '../user.dto';

@Injectable()
export class UserDAO {
  constructor(
    private readonly createDAO: CreateDAO,
    private readonly updateDAO: UpdateDAO,
    private readonly deleteDAO: DeleteDAO,
    private readonly findAllDAO: FindAllByCompanyIdDAO,
    private readonly findByIdDAO: FindByIdDAO,
    private readonly findByEmailDAO: FindByEmailDAO,
  ) {}

  async create(role: UserEntity): Promise<UserEntity> {
    return await this.createDAO.execute(role);
  }

  async update(id: string, role: UserEntity): Promise<UserEntity> {
    return await this.updateDAO.execute(id, role);
  }

  async delete(id: string): Promise<UserEntity> {
    return await this.deleteDAO.execute(id);
  }

  async findAllByCompanyId(
    companyId: string,
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDTO[]>> {
    return await this.findAllDAO.execute(companyId, pagination);
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.findByIdDAO.execute(id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.findByEmailDAO.execute(email);
  }
}
