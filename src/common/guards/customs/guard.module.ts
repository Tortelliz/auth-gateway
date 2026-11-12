import { Global, Module } from '@nestjs/common';
import { SelfGuardService } from './services/self-guard.service';
import { GuardService } from './services/guard.service';
import { CreateUserPermissionsGuardService } from './services/create-user-permissions-guard.service';
import { RoleModule } from '../../../modules/role/role.module';
import { UserModule } from '../../../modules/user/user.module';
import { DeleteUserPermissionsGuardService } from './services/delete-user-permissions-guard.service';
import { FindAllUsersGuardService } from './services/find-all-users-guard.service';

@Global()
@Module({
  imports: [RoleModule, UserModule],
  providers: [
    GuardService,
    SelfGuardService,
    CreateUserPermissionsGuardService,
    DeleteUserPermissionsGuardService,
    FindAllUsersGuardService,
  ],
  exports: [GuardService],
})
export class GuardModule {}
