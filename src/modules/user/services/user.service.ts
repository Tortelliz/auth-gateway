import { Injectable } from '@nestjs/common';
import { CreateService } from './create.service';
import { CreateUserDto, UpdateUserDto, UserDto } from '../user.dto';
import { UpdateService } from './update.service';
import { DeleteService } from './delete.service';
import { FindOneByIdService } from './find-one-by-id.service';
import { FindOneByEmailService } from './find-one-by-email.service';
import { FindAllService } from './find-all.service';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../../common/pagination/pagination.dto';
import { AddLoginFailAttemptService } from './add-login-fail-attempt.service';
import { DeactivateService } from './deactivate.service';
import { LoginStampService } from './login-stamp.service';
import { SetMustChangePasswordService } from './set-must-change-password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,
    private readonly findOneByIdService: FindOneByIdService,
    private readonly findOneByEmailService: FindOneByEmailService,
    private readonly findAllService: FindAllService,
    private readonly addLoginFailAttemptService: AddLoginFailAttemptService,
    private readonly deactivateService: DeactivateService,
    private readonly loginStampService: LoginStampService,
    private readonly setMustChangePasswordService: SetMustChangePasswordService,
  ) {}

  async create(user: CreateUserDto): Promise<UserDto> {
    return await this.createService.execute(user);
  }

  async update(id: string, user: UpdateUserDto): Promise<UserDto> {
    return await this.updateService.execute(id, user);
  }

  async delete(id: string): Promise<UserDto> {
    return await this.deleteService.execute(id);
  }

  async findOneById(id: string): Promise<UserDto> {
    return await this.findOneByIdService.execute(id);
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.findOneByEmailService.execute(email);
  }

  async findAll(
    pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return await this.findAllService.execute(pagination);
  }

  async addLoginFailAttempt(id: string): Promise<UserDto> {
    return await this.addLoginFailAttemptService.execute(id);
  }

  async deactivate(id: string): Promise<UserDto> {
    return await this.deactivateService.execute(id);
  }

  async loginStamp(id: string): Promise<UserDto> {
    return await this.loginStampService.execute(id);
  }

  async setMustChangePassword(id: string): Promise<UserDto> {
    return await this.setMustChangePasswordService.execute(id);
  }
}
