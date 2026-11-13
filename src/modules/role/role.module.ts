import { Module } from '@nestjs/common';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';
import { RoleDao } from './daos/role.dao';
import { CreateDao } from './daos/create.dao';
import { UpdateDao } from './daos/update.dao';
import { DeleteDao } from './daos/delete.dao';
import { FindAllDao } from './daos/find-all.dao';
import { FindByIdDao } from './daos/find-by-id.dao';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';
import { FindAllService } from './services/find-all.service';
import { FindOneService } from './services/find-one.service';
import { RoleRepository } from './role.repository';
import { RoleMapper } from './role.mapper';
import { FindByUserIdDao } from './daos/find-by-user-id.dao';
import { FindByUserService } from './services/find-by-user.service';
import { CompanyModule } from '../company/company.module';
import { FindByCompanyIdDao } from './daos/find-by-company-id.dao';
import { FindByCompanyService } from './services/find-by-company.service';

@Module({
  imports: [PaginationModule, PrismaModule, CompanyModule],
  controllers: [RoleController],
  providers: [
    RoleDao,
    CreateDao,
    UpdateDao,
    DeleteDao,
    FindAllDao,
    FindByIdDao,
    FindByUserIdDao,
    FindByCompanyIdDao,
    RoleService,
    CreateService,
    UpdateService,
    DeleteService,
    FindAllService,
    FindOneService,
    FindByUserService,
    FindByCompanyService,
    RoleRepository,
    RoleMapper,
  ],
  exports: [RoleService],
})
export class RoleModule {}
