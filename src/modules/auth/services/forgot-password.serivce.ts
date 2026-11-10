import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { UserService } from '../../user/services/user.service';
import { ForgotPasswordDto } from '../auth.dto';
import { CheckPasswordTokenService } from './check-password-token.service';

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly checkPasswordTokenService: CheckPasswordTokenService,
  ) {}

  async execute(userId: string, data: ForgotPasswordDto): Promise<boolean> {
    await this.userService.findOneById(userId);
    await this.checkPasswordTokenService.execute(data.token);
    await this.userService.updatePassword(userId, {
      password: data.new_password,
      confirm_password: data.confirm_password,
    });
    return true;
  }
}
