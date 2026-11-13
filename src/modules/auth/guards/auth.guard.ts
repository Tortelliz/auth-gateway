import { Injectable } from '@nestjs/common';
import { YourselfGuard } from './yourself.guard';
import { CreateUserPermissionsGuard } from './create-user-permissions.guard';
import { DeleteUserPermissionsGuard } from './delete-user-permissions.guard';
import { FindAllUsersGuard } from './find-all-users.guard';
import { RolesGuard } from './roles.guard';
import { SessionEntity } from '../../../../generated/prisma/client';
import { CheckIsValidTokenGuard } from './check-is-valid-token.guard';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly yourselfGuard: YourselfGuard,
    private readonly createUserPermissionsGuard: CreateUserPermissionsGuard,
    private readonly deleteUserPermissionsGuard: DeleteUserPermissionsGuard,
    private readonly findAllUsersGuard: FindAllUsersGuard,
    private readonly rolesGuard: RolesGuard,
    private readonly checkIsValidTokenGuard: CheckIsValidTokenGuard,
  ) {}

  yourself(token: SessionEntity, targetUserId: string): void {
    return this.yourselfGuard.execute(token, targetUserId);
  }

  async createUserPermissions(
    token: SessionEntity,
    newUserRoleIds: string[],
  ): Promise<void> {
    return await this.createUserPermissionsGuard.execute(token, newUserRoleIds);
  }

  async deleteUserPermissions(
    token: SessionEntity,
    targetUserId: string,
  ): Promise<void> {
    return await this.deleteUserPermissionsGuard.execute(token, targetUserId);
  }

  findAllUsers(token: SessionEntity): { user_id_to_omit: string } {
    return this.findAllUsersGuard.execute(token);
  }

  get roles(): RolesGuard {
    return this.rolesGuard;
  }

  async checkIsValidToken(rawToken: string): Promise<SessionEntity> {
    return await this.checkIsValidTokenGuard.execute(rawToken);
  }
}
