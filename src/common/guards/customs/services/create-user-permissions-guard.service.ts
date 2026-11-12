import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleService } from '../../../../modules/role/services/role.service';
import { UserService } from '../../../../modules/user/services/user.service';
import { AuthService } from '../../../../modules/auth/services/auth.service';

@Injectable()
export class CreateUserPermissionsGuardService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(rawToken: string, newUserRoleIds: string[]): Promise<void> {
    const token = await this.authService.findSessionByToken(rawToken);
    const requesterUser = await this.userService.findOneById(token.user_id);
    const newUserRoles = await Promise.all(
      newUserRoleIds.map(async (roleId) => {
        return await this.roleService.findOne(roleId);
      }),
    );
    const requesterUserRoles = await this.roleService.findByUserId(
      requesterUser.id,
    );
    if (
      !requesterUserRoles.some((item) => item.code === 'admin') &&
      newUserRoles.some((item) => item.code === 'admin')
    )
      throw new ForbiddenException(
        'You do not have permission to create an admin user',
      );
  }
}
