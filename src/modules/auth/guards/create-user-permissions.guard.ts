import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleService } from '../../role/services/role.service';
import { UserService } from '../../user/services/user.service';
import { CheckSessionTokenService } from '../services/check-session-token.service';

@Injectable()
export class CreateUserPermissionsGuard {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  async execute(rawToken: string, newUserRoleIds: string[]): Promise<void> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    const requesterUser = await this.userService.findOneById(token.user_id);
    const newUserRoles = await Promise.all(
      newUserRoleIds.map(async (roleId) => {
        return await this.roleService.findOne(roleId);
      }),
    );
    if (
      !requesterUser.roles.some((item) => item.role.code === 'admin') &&
      newUserRoles.some((item) => item.code === 'admin')
    )
      throw new ForbiddenException(
        'You do not have permission to create an admin user',
      );
  }
}
