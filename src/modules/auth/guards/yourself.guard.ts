import { ForbiddenException, Injectable } from '@nestjs/common';
import { CheckSessionTokenService } from '../services/check-session-token.service';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class YourselfGuard {
  constructor(
    private readonly checkSessionTokenService: CheckSessionTokenService,
  ) {}

  execute(token: SessionEntity, targetUserId: string): void {
    if (token.user_id !== targetUserId)
      throw new ForbiddenException(
        'This action is permitted only for yourself',
      );
  }
}
