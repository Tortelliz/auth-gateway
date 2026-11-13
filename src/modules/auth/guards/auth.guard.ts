import { Injectable } from '@nestjs/common';
import { SelfGuard } from './self.guard';
import { CreateUserPermissionsGuard } from './create-user-permissions.guard';
import { DeleteUserPermissionsGuard } from './delete-user-permissions.guard';
import { FindAllUsersGuard } from './find-all-users.guard';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly selfGuardService: SelfGuard,
    private readonly createUserPermissionsGuardService: CreateUserPermissionsGuard,
    private readonly deleteUserPermissionsGuardService: DeleteUserPermissionsGuard,
    private readonly findAllUsersGuardService: FindAllUsersGuard,
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
