import { Injectable } from '@nestjs/common';
import { CheckSessionTokenService } from '../services/check-session-token.service';

@Injectable()
export class FindAllUsersGuard {
  constructor(
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  async execute(rawToken: string): Promise<{ user_id_to_omit: string }> {
    const token = await this.checkSessionTokenService.execute(rawToken);
    return {
      user_id_to_omit: token.user_id,
    };
  }
}
