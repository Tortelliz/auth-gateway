import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserMapper } from '../user.mapper';
import { UserDTO } from '../user.dto';

@Injectable()
export class ResetLoginFailsAttemptsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string): Promise<UserDTO> {
    const user = await this.userRepository.resetPasswordFailsAttempts(id);
    return await this.userMapper.fromEntityToDTO(user);
  }
}
