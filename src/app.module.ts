import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PaginationModule } from './common/pagination/pagination.module';
import z from 'zod';
import { RoleModule } from './modules/role/role.module';
import { CompanyModule } from './modules/company/company.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './lib/resend/email.module';

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
        SESSION_TOKEN_EXPIRES_IN_DAYS: z.coerce.number(),
        PASSWORD_TOKEN_EXPIRES_IN_MINUTES: z.coerce.number(),
        FIRST_ACCESS_TOKEN_EXPIRES_IN_MINUTES: z.coerce.number(),
        RESEND_API_KEY: z.string(),
        EMAIL: z.string(),
      }),
    }),
    PrismaModule,
    PaginationModule,
    RoleModule,
    CompanyModule,
    UserModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
