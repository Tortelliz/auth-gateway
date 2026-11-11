import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDto } from '../user.dto';
import { UserMapper } from '../user.mapper';

@Injectable()
export class GetUserWithPasswordByEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(email: string): Promise<UserDto & { password: string }> {
    const user = await this.userRepository.findByEmail(email);
    return {
      ...(await this.userMapper.fromEntityToDto(user)),
      password: user.password,
    };
  }
}
