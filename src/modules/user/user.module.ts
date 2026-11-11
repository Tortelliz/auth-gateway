import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { RoleModule } from '../role/role.module';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserDao } from './daos/user.dao';
import { CreateDao } from './daos/create.dao';
import { UpdateDao } from './daos/update.dao';
import { DeleteDao } from './daos/delete.dao';
import { FindAllDao } from './daos/find-all.dao';
import { FindByIdDao } from './daos/find-by-id.dao';
import { FindByEmailDao } from './daos/find-by-email.dao';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';
import { FindAllService } from './services/find-all.service';
import { FindOneByIdService } from './services/find-one-by-id.service';
import { FindOneByEmailService } from './services/find-one-by-email.service';
import { UserRepository } from './user.repository';
import { UserMapper } from './user.mapper';
import { AddLoginFailAttemptService } from './services/add-login-fail-attempt.service';
import { DeactivateService } from './services/deactivate.service';
import { SetMustChangePasswordService } from './services/set-must-change-password.service';
import { UpdatePasswordService } from './services/update-password.service';
import { ResetLoginFailAttemptsService } from './services/reset-login-fail-attempts.service';
import { GetUserWithPasswordByEmailService } from './services/get-user-with-password-by-email.service';
import { LoginStampService } from './services/login-stamp.service';
import { RegisterFirstAccessService } from './services/register-first-access.service';
import { RegisterEmailVerificationService } from './services/register-email-verification.service';
import { EmailModule } from '../../lib/resend/email.module';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    PrismaModule,
    RoleModule,
    PaginationModule,
    EmailModule,
    CompanyModule,
  ],
  controllers: [UserController],
  providers: [
    UserDao,
    CreateDao,
    UpdateDao,
    DeleteDao,
    FindAllDao,
    FindByIdDao,
    FindByEmailDao,
    UserService,
    CreateService,
    UpdateService,
    DeleteService,
    FindAllService,
    FindOneByIdService,
    FindOneByEmailService,
    AddLoginFailAttemptService,
    DeactivateService,
    SetMustChangePasswordService,
    UpdatePasswordService,
    ResetLoginFailAttemptsService,
    GetUserWithPasswordByEmailService,
    LoginStampService,
    RegisterFirstAccessService,
    RegisterEmailVerificationService,
    UserRepository,
    UserMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
