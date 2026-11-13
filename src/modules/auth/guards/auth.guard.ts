import { Injectable } from '@nestjs/common';
import { YourselfGuard } from './yourself.guard';
import { CreateUserPermissionsGuard } from './create-user-permissions.guard';
import { DeleteUserPermissionsGuard } from './delete-user-permissions.guard';
import { FindAllUsersGuard } from './find-all-users.guard';
import { RolesGuard } from './roles.guard';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly yourselfGuard: YourselfGuard,
    private readonly createUserPermissionsGuard: CreateUserPermissionsGuard,
    private readonly deleteUserPermissionsGuard: DeleteUserPermissionsGuard,
    private readonly findAllUsersGuard: FindAllUsersGuard,
    private readonly rolesGuard: RolesGuard,
  ) {}

  async yourself(rawToken: string, targetUserId: string): Promise<void> {
    return await this.yourselfGuard.execute(rawToken, targetUserId);
  }

  async createUserPermissions(
    rawToken: string,
    newUserRoleIds: string[],
  ): Promise<void> {
    return await this.createUserPermissionsGuard.execute(
      rawToken,
      newUserRoleIds,
    );
  }

  async deleteUserPermissions(
    rawToken: string,
    targetUserId: string,
  ): Promise<void> {
    return await this.deleteUserPermissionsGuard.execute(
      rawToken,
      targetUserId,
    );
  }

  async findAllUsers(rawToken: string): Promise<{ user_id_to_omit: string }> {
    return await this.findAllUsersGuard.execute(rawToken);
  }

  get roles(): RolesGuard {
    return this.rolesGuard;
  }
}
