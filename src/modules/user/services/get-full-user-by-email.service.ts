import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { FullUserEntity } from '../user.entity';

@Injectable()
export class GetFullUserByEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<FullUserEntity> {
    return await this.userRepository.findByEmail(email);
  }
}
