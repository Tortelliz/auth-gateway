import { ForbiddenException, Injectable } from '@nestjs/common';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class YourselfGuard {
  execute(token: SessionEntity, targetUserId: string): void {
    if (token.user_id !== targetUserId)
      throw new ForbiddenException(
        'This action is permitted only for yourself',
      );
  }
}
