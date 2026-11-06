import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { CompanyController } from './company.controller';
import { CompanyDao } from './daos/company.dao';
import { CreateDao } from './daos/create.dao';
import { UpdateDao } from './daos/update.dao';
import { DeleteDao } from './daos/delete.dao';
import { FindByIdDao } from './daos/find-by-id.dao';
import { FindAllDao } from './daos/find-all.dao';
import { CompanyService } from './services/company.service';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';
import { FindAllService } from './services/find-all.service';
import { FindOneService } from './services/find-one.service';
import { CompanyMapper } from './company.mapper';
import { CompanyRepository } from './company.repository';

@Module({
  imports: [PrismaModule, PaginationModule],
  controllers: [CompanyController],
  providers: [
    CompanyDao,
    CreateDao,
    UpdateDao,
    DeleteDao,
    FindByIdDao,
    FindAllDao,
    CompanyService,
    CreateService,
    UpdateService,
    DeleteService,
    FindAllService,
    FindOneService,
    CompanyMapper,
    CompanyRepository,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
