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

@Module({
  imports: [PaginationModule, PrismaModule],
  controllers: [RoleController],
  providers: [
    RoleDao,
    CreateDao,
    UpdateDao,
    DeleteDao,
    FindAllDao,
    FindByIdDao,
    RoleService,
    CreateService,
    UpdateService,
    DeleteService,
    FindAllService,
    FindOneService,
    RoleRepository,
  ],
  exports: [RoleService],
})
export class RoleModule {}
