import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './services/company.service';
import { CompanyDAO } from './daos/company.dao';
import { CreateDAO } from './daos/create.dao';
import { CreateService } from './services/create.service';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { CompanyRepository } from './company.repository';
import { FindAllDAO } from './daos/find-all.dao';
import { FindAllService } from './services/find-all.service';
import { UpdateDAO } from './daos/update.dao';
import { UpdateService } from './services/update.service';
import { FindByIdDAO } from './daos/find-by-id.dao';
import { FindByIdService } from './services/find-by-id.service';
import { DeleteDAO } from './daos/delete.dao';
import { DeleteService } from './services/delete.service';
import { MapperService } from './services/mapper.service';
import { PaginationModule } from '../../common/pagination/pagination.module';

@Module({
  imports: [PrismaModule, PaginationModule],
  controllers: [CompanyController],
  providers: [
    CompanyRepository,
    CompanyDAO,
    CreateDAO,
    FindAllDAO,
    FindByIdDAO,
    UpdateDAO,
    DeleteDAO,
    CompanyService,
    CreateService,
    FindAllService,
    FindByIdService,
    UpdateService,
    DeleteService,
    MapperService,
  ],
})
export class CompanyModule {}
