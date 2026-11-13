import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class RolesGuard {
  constructor(private readonly userService: UserService) {}

  async isAdmin(token: SessionEntity): Promise<void> {
    const requestUser = await this.userService.findOneById(token.user_id);
    if (!requestUser.roles.some((item) => item.role.code === 'admin'))
      throw new UnauthorizedException('Admin role is missing');
  }

  async isStaff(token: SessionEntity): Promise<void> {
    const requestUser = await this.userService.findOneById(token.user_id);
    if (!requestUser.roles.some((item) => item.role.code === 'staff'))
      throw new UnauthorizedException('Staff role is missing');
  }

  async isViewer(token: SessionEntity): Promise<void> {
    const requestUser = await this.userService.findOneById(token.user_id);
    if (!requestUser.roles.some((item) => item.role.code === 'viewer'))
      throw new UnauthorizedException('Viewer role is missing');
  }
}
