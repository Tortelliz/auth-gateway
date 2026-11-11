import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { TokenEntity } from '../../../../generated/prisma/client';
import { generateUUIDUtil } from '../../../utils/generate-uuid.util';
import { hashToken } from '../../../utils/hash-token.util';
import { ConfigService } from '@nestjs/config';
import { generateRandomTokenUtil } from '../../../utils/generate-random-token.util';
import { UserService } from '../../user/services/user.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { EmailService } from '../../../lib/resend/email.service';
import { CompanyService } from '../../company/services/company.service';
import { firstAccessTokenTemplate } from '../../../lib/resend/templates/first-access-token-template';
import { UserDto } from '../../user/user.dto';

@Injectable()
export class GenerateFirstAccessTokenService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly emailService: EmailService,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.getUser(email);
    if (user) {
      this.checkMustFirstAccess(user);
      const token = generateRandomTokenUtil();
      await this.authRepository.createToken(this.build(user.id, token));
      await this.sendEmail(user, token);
    }
  }

  private build(userId: string, rawToken: string): TokenEntity {
    const tokenExpiresInMinutes = this.configService.getOrThrow<number>(
      'FIRST_ACCESS_TOKEN_EXPIRES_IN_MINUTES',
    );
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMinutes(expiresAt.getMinutes() + tokenExpiresInMinutes);
    return {
      id: generateUUIDUtil(),
      user_id: userId,
      hash_token: hashToken(rawToken),
      resource: 'first_access',
      revoked: false,
      created_at: now,
      expires_at: expiresAt,
      revoked_at: null,
    };
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

  private async sendEmail(user: UserDto, code: string): Promise<void> {
    const company = await this.companyService.findOne(user?.company_id);
    await this.emailService.send({
      to: user.email,
      subject: `Primeiro acesso - ${user.first_name} ${user.last_name} - ${company.name}`,
      body: firstAccessTokenTemplate({
        appName: 'Grafcet Auth Gateway',
        name: `${user.first_name}`,
        code,
        expiresInMinutes: this.configService.getOrThrow<number>(
          'FIRST_ACCESS_TOKEN_EXPIRES_IN_MINUTES',
        ),
      }),
    });
  }

  private checkMustFirstAccess(user: UserDto): void {
    if (!user.first_access)
      throw new ForbiddenException(
        'The user has already performed their first access',
      );
  }
}
