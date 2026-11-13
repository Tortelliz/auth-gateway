import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../modules/auth/services/auth.service';

@Injectable()
export class FindAllUsersGuard {
  constructor(private readonly authService: AuthService) {}

  async execute(rawToken: string): Promise<{ user_id_to_omit: string }> {
    const token = await this.authService.findSessionByToken(rawToken);
    return {
      user_id_to_omit: token.user_id,
    };
  }
}
