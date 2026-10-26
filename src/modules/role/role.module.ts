import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { FindByIdService } from './services/find-by-id.service';
import { FindAllService } from './services/find-all.service';
import { RoleDAO } from './daos/role.dao';
import { CreateDAO } from './daos/create.dao';
import { UpdateDAO } from './daos/update.dao';
import { FindByIdDAO } from './daos/find-by-id.dao';
import { FindAllDAO } from './daos/find-all.dao';
import { RoleRepository } from './role.repository';
import { DeleteDAO } from './daos/delete.dao';
import { DeleteService } from './services/delete.service';
import { PaginationModule } from '../../common/pagination/pagination.module';
import { FindByUserIdDAO } from './daos/find-by-user-id.dao';
import { FindByUserIdService } from './services/find-by-user-id.service';

@Module({
  imports: [PrismaModule, PaginationModule],
  controllers: [RoleController],
  providers: [
    RoleRepository,
    RoleDAO,
    CreateDAO,
    UpdateDAO,
    DeleteDAO,
    FindByIdDAO,
    FindByUserIdDAO,
    FindAllDAO,
    RoleService,
    CreateService,
    UpdateService,
    DeleteService,
    FindByIdService,
    FindAllService,
    FindByUserIdService,
  ],
  exports: [RoleService],
})
export class RoleModule {}
