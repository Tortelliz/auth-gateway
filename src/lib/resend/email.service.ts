import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async send(data: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void> {
    const resend = new Resend(
      this.configService.getOrThrow<string>('RESEND_API_KEY'),
    );
    await resend.emails.send({
      from: this.configService.getOrThrow<string>('RESEND_NOTIFIER_EMAIL'),
      to: data.to,
      subject: data.subject,
      html: data.body,
    });
  }
}
