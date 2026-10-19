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

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [
    RoleRepository,
    RoleDAO,
    CreateDAO,
    UpdateDAO,
    DeleteDAO,
    FindByIdDAO,
    FindAllDAO,
    RoleService,
    CreateService,
    UpdateService,
    DeleteService,
    FindByIdService,
    FindAllService,
  ],
})
export class RoleModule {}
