import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { SessionEntity } from '../../../../generated/prisma/client';
import { hashToken } from '../../../utils/hash-token.util';

@Injectable()
export class FindSessionByTokenService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(token: string): Promise<SessionEntity> {
    return await this.authRepository.findSessionByToken(hashToken(token));
  }
}
