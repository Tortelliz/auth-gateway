import { Injectable } from '@nestjs/common';
import { EmailService } from '../../../lib/resend/email.service';
import { UserService } from '../../user/services/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { UserDto } from '../../user/user.dto';
import { passwordTokenTemplate } from '../../../lib/resend/templates/password-token.template';
import { GeneratePasswordTokenService } from './generate-password-token.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendPasswordTokenEmailService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly generatePasswordTokenService: GeneratePasswordTokenService,
    private readonly configService: ConfigService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.getUser(email);
    if (user) {
      const { token } = await this.generatePasswordTokenService.execute(
        user.id,
      );
      await this.emailService.send({
        to: email,
        subject: 'Token de alteração de senha',
        body: passwordTokenTemplate({
          appName: 'Grafcet Auth Gateway',
          name: `${user.first_name} ${user.last_name}`,
          code: token,
          expiresInMinutes: this.configService.getOrThrow<number>(
            'PASSWORD_TOKEN_EXPIRES_IN_MINUTES',
          ),
        }),
      });
    }
  }

  private async getUser(email: string): Promise<UserDto | undefined> {
    try {
      return await this.userService.findOneByEmail(email);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        return;
    }
  }
}
