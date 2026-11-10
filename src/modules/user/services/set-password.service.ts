import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { SetPasswordDto, UserDto } from '../user.dto';
import { FullUserEntity } from '../user.entity';
import { hashService } from '../../../lib/bcrypt/hash.service';
import { UserMapper } from '../user.mapper';
import { compareService } from '../../../lib/bcrypt/compare.service';

@Injectable()
export class SetPasswordService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async execute(id: string, passwords: SetPasswordDto): Promise<UserDto> {
    const user = await this.userRepository.findById(id);
    this.checkMatchPasswords(passwords);
    await this.checkMatchOldPassword(user.password, passwords.password);
    return await this.userMapper.fromEntityToDto(
      await this.userRepository.update(
        id,
        await this.build(user, passwords.password),
      ),
    );
  }

  private async build(
    user: FullUserEntity,
    newPassword: string,
  ): Promise<FullUserEntity> {
    return {
      ...user,
      password: await hashService(newPassword),
      must_change_password: false,
      updated_at: new Date(),
    };
  }

  private checkMatchPasswords(passwords: SetPasswordDto): void {
    if (passwords.password != passwords.confirm_password)
      throw new ForbiddenException('Passwords do not match');
  }

  private async checkMatchOldPassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const isMatch = await compareService(newPassword, oldPassword);
    if (isMatch)
      throw new ForbiddenException(
        'The password must be different from the last one',
      );
  }
}
