import { ForbiddenException, Injectable } from '@nestjs/common';
import { CheckSessionTokenService } from '../services/check-session-token.service';

@Injectable()
export class YourselfGuard {
  constructor(
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  async execute(rawToken: string, targetUserId: string): Promise<void> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    if (token.user_id !== targetUserId)
      throw new ForbiddenException(
        'This action is permitted only for yourself',
      );
  }
}
