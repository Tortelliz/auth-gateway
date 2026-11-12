import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleService } from '../../../../modules/role/services/role.service';
import { UserService } from '../../../../modules/user/services/user.service';
import { AuthService } from '../../../../modules/auth/services/auth.service';

@Injectable()
export class DeleteUserPermissionsGuardService {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(rawToken: string, targetUserId: string): Promise<void> {
    const token = await this.authService.findSessionByToken(rawToken);
    const requesterUser = await this.userService.findOneById(token.user_id);
    const targetUser = await this.userService.findOneById(targetUserId);
    const requesterUserRoles = await this.roleService.findByUserId(
      requesterUser.id,
    );
    if (
      !requesterUserRoles.some((item) => item.code === 'admin') &&
      targetUser.roles.some((item) => item.role.code === 'admin')
    )
      throw new ForbiddenException(
        'You do not have permission to delete an admin user',
      );
  }
}
