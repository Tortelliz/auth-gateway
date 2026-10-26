import { Module } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { RoleModule } from '../role/role.module';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { UserDAO } from './daos/user.dao';
import { CreateDAO } from './daos/create.dao';
import { UpdateDAO } from './daos/update.dao';
import { DeleteDAO } from './daos/delete.dao';
import { FindAllByCompanyIdDAO } from './daos/find-all-by-company-id.dao';
import { FindByIdDAO } from './daos/find-by-id.dao';
import { FindByEmailDAO } from './daos/find-by-email.dao';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';
import { FindAllByCompanyIdService } from './services/find-all-by-company-id.service';
import { FindByIdService } from './services/find-by-id.service';
import { FindByEmailService } from './services/find-by-email.service';
import { UserMapper } from './user.mapper';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { UserRepository } from './user.repository';
import { AddLoginFailAttemptDAO } from './daos/add-login-fail-attempt.dao';
import { SetMustChangePasswordDAO } from './daos/set-must-change-password.dao';
import { DeactivateDAO } from './daos/deactivate.dao';
import { DeactivateService } from './services/deactivate.service';
import { SetMustChangePasswordService } from './services/set-must-change-password.service';
import { AddLoginFailAttemptService } from './services/add-login-fail-attempt.service';

@Module({
  imports: [CompanyModule, PrismaModule, RoleModule, PaginationModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserDAO,
    CreateDAO,
    UpdateDAO,
    DeleteDAO,
    FindAllByCompanyIdDAO,
    FindByIdDAO,
    FindByEmailDAO,
    AddLoginFailAttemptDAO,
    SetMustChangePasswordDAO,
    DeactivateDAO,
    CreateService,
    UpdateService,
    DeleteService,
    FindAllByCompanyIdService,
    FindByIdService,
    FindByEmailService,
    UserMapper,
    UserRepository,
    DeactivateService,
    SetMustChangePasswordService,
    AddLoginFailAttemptService,
    UserMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
