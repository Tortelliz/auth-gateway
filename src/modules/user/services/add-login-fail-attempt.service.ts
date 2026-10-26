import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDTO } from '../user.dto';
import { UserMapper } from '../user.mapper';

@Injectable()
export class AddLoginFailAttemptService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string): Promise<UserDTO> {
    const updatedUser = await this.userRepository.addLoginFailAttempt(id);
    return await this.userMapper.fromEntityToDTO(updatedUser);
  }
}
