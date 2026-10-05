import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './services/company.service';
import { CompanyDAO } from './daos/company.dao';
import { CreateDAO } from './daos/create.dao';
import { CreateService } from './services/create.service';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyController],
  providers: [
    CompanyRepository,
    CompanyDAO,
    CreateDAO,
    CompanyService,
    CreateService,
  ],
})
export class CompanyModule {}
