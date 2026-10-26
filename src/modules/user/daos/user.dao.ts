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
import { DeactivateDAO } from './deactivate.dao';
import { AddLoginFailAttemptDAO } from './add-login-fail-attempt.dao';
import { SetMustChangePasswordDAO } from './set-must-change-password.dao';
import { FindPasswordByEmailDAO } from './find-password-by-email.dao';
import { SetPasswordDAO } from './set-password.dao';
import { ResetLoginFailsAttemptsDAO } from './reset-login-fails-attempts.dao';

@Injectable()
export class UserDAO {
  constructor(
    private readonly createDAO: CreateDAO,
    private readonly updateDAO: UpdateDAO,
    private readonly deleteDAO: DeleteDAO,
    private readonly findAllDAO: FindAllByCompanyIdDAO,
    private readonly findByIdDAO: FindByIdDAO,
    private readonly findByEmailDAO: FindByEmailDAO,
    private readonly deactivateDAO: DeactivateDAO,
    private readonly addLoginFailAttemptDAO: AddLoginFailAttemptDAO,
    private readonly setMustChangePasswordDAO: SetMustChangePasswordDAO,
    private readonly findPasswordByEmailDAO: FindPasswordByEmailDAO,
    private readonly setPasswordDAO: SetPasswordDAO,
    private readonly resetLoginFailsAttemptsDAO: ResetLoginFailsAttemptsDAO,
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

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.findByEmailDAO.execute(email);
  }

  async deactivate(id: string): Promise<UserEntity> {
    return await this.deactivateDAO.execute(id);
  }

  async addLoginFailAttempt(id: string): Promise<UserEntity> {
    return await this.addLoginFailAttemptDAO.execute(id);
  }

  async setMustChangePassword(id: string): Promise<UserEntity> {
    return await this.setMustChangePasswordDAO.execute(id);
  }

  async findPasswordByEmail(
    email: string,
  ): Promise<{ password: string } | null> {
    return await this.findPasswordByEmailDAO.execute(email);
  }

  async setPassword(userId: string, password: string): Promise<UserEntity> {
    return await this.setPasswordDAO.execute(userId, password);
  }

  async resetLoginFailsAttempts(id: string): Promise<UserEntity> {
    return await this.resetLoginFailsAttemptsDAO.execute(id);
  }
}
