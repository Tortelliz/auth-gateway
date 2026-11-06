import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { UserDto } from '../user.dto';
import { UserMapper } from '../user.mapper';

@Injectable()
export class FindOneByEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(email: string): Promise<UserDto> {
    return await this.userMapper.fromEntityToDto(
      await this.userRepository.findByEmail(email),
    );
  }
}
