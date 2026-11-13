import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CheckSessionTokenService } from '../services/check-session-token.service';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class RolesGuard {
  constructor(
    private readonly checkSessionTokenService: CheckSessionTokenService,
    private readonly userService: UserService,
  ) {}

  async isAdmin(rawToken: string): Promise<void> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    const requestUser = await this.userService.findOneById(token.user_id);
    if (!requestUser.roles.some((item) => item.role.code === 'admin'))
      throw new UnauthorizedException('Admin role is missing');
  }

  async isStaff(rawToken: string): Promise<void> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    const requestUser = await this.userService.findOneById(token.user_id);
    if (!requestUser.roles.some((item) => item.role.code === 'staff'))
      throw new UnauthorizedException('Staff role is missing');
  }

  async isOperator(rawToken: string): Promise<void> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    const requestUser = await this.userService.findOneById(token.user_id);
    if (!requestUser.roles.some((item) => item.role.code === 'operator'))
      throw new UnauthorizedException('Operator role is missing');
  }

  async isViewer(rawToken: string): Promise<void> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    const requestUser = await this.userService.findOneById(token.user_id);
    if (!requestUser.roles.some((item) => item.role.code === 'viewer'))
      throw new UnauthorizedException('Viewer role is missing');
  }
}
