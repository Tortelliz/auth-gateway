import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { SessionEntity } from '../auth.entity';

@Injectable()
export class RevokeSessionDAO {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(hashToken: string): Promise<SessionEntity> {
    return await this.prismaService.session.update({
      where: { hash_token: hashToken },
      data: {
        revoked: true,
        revoked_at: new Date(),
      },
    });
  }
}
