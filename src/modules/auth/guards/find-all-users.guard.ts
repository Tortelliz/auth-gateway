import { Injectable } from '@nestjs/common';
import { CheckSessionTokenService } from '../services/check-session-token.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindAllUsersGuard {
  constructor(
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  execute(token: SessionEntity): { user_id_to_omit: string } {
    return {
      user_id_to_omit: token.user_id,
    };
  }
}
