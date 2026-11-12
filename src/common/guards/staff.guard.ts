import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../../modules/auth/services/auth.service';
import { UserService } from '../../modules/user/services/user.service';

@Injectable()
export class StaffGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const rawToken = request.cookies?.['session_token'] as string | undefined;
    if (!rawToken) throw new UnauthorizedException('Token not found');
    const token = await this.authService.checkSessionToken(rawToken);
    const user = await this.userService.findOneById(token.user_id);
    const roles = user.roles.map((item) => item.role.code);
    if (!roles.includes('staff'))
      throw new UnauthorizedException('Staff role is missing');
    return true;
  }
}
