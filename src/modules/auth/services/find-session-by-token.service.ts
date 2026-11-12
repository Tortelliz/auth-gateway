import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { SessionEntity } from '../../../../generated/prisma/client';

@Injectable()
export class FindSessionByTokenService {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(hashToken: string): Promise<SessionEntity> {
    return await this.authRepository.findSessionByToken(hashToken);
  }
}
