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
import { SetMustChangePasswordService } from './set-must-change-password.service';
import { UpdatePasswordService } from './update-password.service';
import { ResetLoginFailAttemptsService } from './reset-login-fail-attempts.service';
import { GetUserWithPasswordByEmailService } from './get-user-with-password-by-email.service';
import { RegisterFirstAccessService } from './register-first-access.service';
import { RegisterEmailVerificationService } from './register-email-verification.service';
import { UpdateToLoginService } from './update-to-login.service';

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
    private readonly setMustChangePasswordService: SetMustChangePasswordService,
    private readonly updatePasswordService: UpdatePasswordService,
    private readonly resetLoginFailAttemptsService: ResetLoginFailAttemptsService,
    private readonly getUserWithPasswordByEmailService: GetUserWithPasswordByEmailService,
    private readonly registerFirstAccessService: RegisterFirstAccessService,
    private readonly registerEmailVerificationService: RegisterEmailVerificationService,
    private readonly updateToLoginService: UpdateToLoginService,
  ) {}

  async create(newUser: CreateUserDto): Promise<UserDto> {
    return await this.createService.execute(newUser);
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
    companyId: string,
    pagination: PaginationRequestDTO,
    omitUserId: string,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return await this.findAllService.execute(companyId, pagination, omitUserId);
  }

  async addLoginFailAttempt(id: string): Promise<UserDto> {
    return await this.addLoginFailAttemptService.execute(id);
  }

  async deactivate(id: string): Promise<UserDto> {
    return await this.deactivateService.execute(id);
  }

  async setMustChangePassword(id: string): Promise<UserDto> {
    return await this.setMustChangePasswordService.execute(id);
  }

  async updatePassword(
    id: string,
    passwords: { password: string; confirm_password: string },
  ): Promise<UserDto> {
    return await this.updatePasswordService.execute(id, passwords);
  }

  async resetLoginFailAttempts(id: string): Promise<UserDto> {
    return await this.resetLoginFailAttemptsService.execute(id);
  }

  async getUserWithPasswordByEmail(
    email: string,
  ): Promise<UserDto & { password: string }> {
    return await this.getUserWithPasswordByEmailService.execute(email);
  }

  async registerFirstAccess(id: string): Promise<UserDto> {
    return await this.registerFirstAccessService.execute(id);
  }

  async registerEmailVerification(id: string): Promise<UserDto> {
    return await this.registerEmailVerificationService.execute(id);
  }

  async updateToLogin(id: string): Promise<UserDto> {
    return await this.updateToLoginService.execute(id);
  }
}
