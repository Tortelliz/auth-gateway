import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { SetPasswordDTO, UserDTO } from '../user.dto';
import { UserMapper } from '../user.mapper';
import { hashService } from '../../../lib/bcrypt/hash.service';
import { compareService } from '../../../lib/bcrypt/compare.service';

@Injectable()
export class SetPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(data: SetPasswordDTO): Promise<UserDTO> {
    if (data.password != data.password_confirmation)
      throw new ForbiddenException('Passwords do not match');
    const oldUser = await this.userRepository.findById(data.user_id);
    const isNotChange = await compareService(data.password, oldUser.password);
    if (isNotChange) {
      throw new ForbiddenException(
        'The new password must be different from the last one',
      );
    }
    const user = await this.userRepository.setPassword(
      data.user_id,
      await hashService(data.password),
    );
    return await this.userMapper.fromEntityToDTO(user);
  }
}
