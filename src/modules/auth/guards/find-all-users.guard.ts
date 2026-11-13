import { Injectable } from '@nestjs/common';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindAllUsersGuard {
  constructor() {}

  execute(token: SessionEntity): { user_id_to_omit: string } {
    return {
      user_id_to_omit: token.user_id,
    };
  }
}
