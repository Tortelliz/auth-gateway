import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { hashToken } from '../../../../utils/hash-token.util';

@Injectable()
export class SelfGuardService {
  constructor(private readonly authService: AuthService) {}
  async execute(rawToken: string, targetUserId: string): Promise<void> {
    const token = await this.authService.findSessionByToken(
      hashToken(rawToken),
    );
    if (token.user_id !== targetUserId)
      throw new ForbiddenException(
        'This action is permitted only for yourself',
      );
  }
}
