import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class DeleteUserPermissionsGuard {
  constructor(private readonly userService: UserService) {}

  async execute(token: SessionEntity, targetUserId: string): Promise<void> {
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
