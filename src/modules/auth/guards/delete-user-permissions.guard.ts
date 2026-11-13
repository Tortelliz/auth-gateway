import { ForbiddenException, Injectable } from '@nestjs/common';
import { RoleService } from '../../role/services/role.service';
import { UserService } from '../../user/services/user.service';
import { CheckSessionTokenService } from '../services/check-session-token.service';

@Injectable()
export class DeleteUserPermissionsGuard {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  async execute(rawToken: string, targetUserId: string): Promise<void> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    const requesterUser = await this.userService.findOneById(token.user_id);
    const targetUser = await this.userService.findOneById(targetUserId);
    if (
      !requesterUser.roles.some((item) => item.role.code === 'admin') &&
      targetUser.roles.some((item) => item.role.code === 'admin')
    )
      throw new ForbiddenException(
        'You do not have permission to delete an admin user',
      );
  }
}
