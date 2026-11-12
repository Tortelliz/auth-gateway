import { Injectable } from '@nestjs/common';
import { SelfGuardService } from './self-guard.service';
import { CreateUserPermissionsGuardService } from './create-user-permissions-guard.service';
import { DeleteUserPermissionsGuardService } from './delete-user-permissions-guard.service';
import { FindAllUsersGuardService } from './find-all-users-guard.service';
import { UserDto } from '../../../../modules/user/user.dto';

@Injectable()
export class GuardService {
  constructor(
    private readonly selfGuardService: SelfGuardService,
    private readonly createUserPermissionsGuardService: CreateUserPermissionsGuardService,
    private readonly deleteUserPermissionsGuardService: DeleteUserPermissionsGuardService,
    private readonly findAllUsersGuardService: FindAllUsersGuardService,
  ) {}

  async selfGuard(rawToken: string, targetUserId: string): Promise<void> {
    return await this.selfGuardService.execute(rawToken, targetUserId);
  }

  async createUserPermissionsGuard(
    rawToken: string,
    newUserRoleIds: string[],
  ): Promise<void> {
    return await this.createUserPermissionsGuardService.execute(
      rawToken,
      newUserRoleIds,
    );
  }

  async deleteUserPermissionsGuard(
    rawToken: string,
    targetUserId: string,
  ): Promise<void> {
    return await this.deleteUserPermissionsGuardService.execute(
      rawToken,
      targetUserId,
    );
  }

  async findAllUsersGuard(
    rawToken: string,
  ): Promise<{ user_id_to_omit: string }> {
    return await this.findAllUsersGuardService.execute(rawToken);
  }
}
