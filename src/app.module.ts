import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PaginationModule } from './common/pagination/pagination.module';
import z from 'zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: z.object({
        DATABASE_URL: z.string(),
        DB_HOST: z.string(),
        DB_USER: z.string(),
        DB_PASSWORD: z.string(),
        DB_PORT: z.coerce.number(),
        DB_NAME: z.string(),
        LOG_LEVEL: z.enum(['log', 'debug']),
        PAGINATION_DEFAULT_PAGE_SIZE: z.coerce.number(),
      }),
    }),
    PrismaModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
