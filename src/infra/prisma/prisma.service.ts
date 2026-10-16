import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  constructor(private readonly configService: ConfigService) {
    const adapter = new PrismaPg({
      user: configService.getOrThrow<string>('DB_USER'),
      password: configService.getOrThrow<string>('DB_PASSWORD'),
      host: configService.getOrThrow<string>('DB_HOST'),
      database: configService.getOrThrow<string>('DB_NAME'),
      port: configService.getOrThrow<number>('DB_PORT'),
    });
    super({ adapter });
  }
  async onModuleInit(): Promise<void> {
    try {
      const database = this.configService.getOrThrow<string>('DB_NAME');
      await this.$connect();
      await this.$queryRawUnsafe(
        'SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = $1) AS db_exists',
        database,
      );
      this.logger.log('Database successfully connected');
    } catch (error) {
      this.logger.error(error);
    }
  }
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }
}
