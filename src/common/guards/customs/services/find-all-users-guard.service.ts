import { Injectable } from '@nestjs/common';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { hashToken } from '../../../../utils/hash-token.util';

@Injectable()
export class FindAllUsersGuardService {
  constructor(private readonly authService: AuthService) {}

  async execute(rawToken: string): Promise<{ user_id_to_omit: string }> {
    const token = await this.authService.findSessionByToken(
      hashToken(rawToken),
    );
    return {
      user_id_to_omit: token.user_id,
    };
  }
}
