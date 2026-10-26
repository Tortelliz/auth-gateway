import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { FindAllByCompanyIdService } from './find-all-by-company-id.service';
import { FindByIdService } from './find-by-id.service';
import { FindByEmailService } from './find-by-email.service';
import { DeleteService } from './delete.service';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../user.dto';
import { UpdateService } from './update.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { AddLoginFailAttemptService } from './add-login-fail-attempt.service';
import { SetMustChangePasswordService } from './set-must-change-password.service';
import { DeactivateService } from './deactivate.service';

@Injectable()
export class UserService {
  constructor(
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly findAllByCompanyIdService: FindAllByCompanyIdService,
    private readonly findByIdService: FindByIdService,
    private readonly findByEmailService: FindByEmailService,
    private readonly deleteService: DeleteService,
    private readonly addLoginFailAttemptService: AddLoginFailAttemptService,
    private readonly setMustChangePasswordService: SetMustChangePasswordService,
    private readonly deactivateService: DeactivateService,
  ) {}

  async create(user: CreateUserDTO): Promise<UserDTO> {
    return await this.createService.execute(user);
  }

  async update(id: string, user: UpdateUserDTO): Promise<UserDTO> {
    return await this.updateService.execute(id, user);
  }

  async findAllByCompanyId(
    companyId: string,
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDTO[]>> {
    return await this.findAllByCompanyIdService.execute(companyId, pagination);
  }

  async findById(id: string): Promise<UserDTO> {
    return await this.findByIdService.execute(id);
  }

  async findByEmail(email: string): Promise<UserDTO> {
    return await this.findByEmailService.execute(email);
  }

  async delete(id: string): Promise<UserDTO> {
    return await this.deleteService.execute(id);
  }

  async addLoginFailAttempt(id: string): Promise<UserDTO> {
    return await this.addLoginFailAttemptService.execute(id);
  }

  async setMustChangePassword(id: string): Promise<UserDTO> {
    return await this.setMustChangePasswordService.execute(id);
  }

  async deactivate(id: string): Promise<UserDTO> {
    return await this.deactivateService.execute(id);
  }
}
