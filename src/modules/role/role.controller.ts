import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { RoleService } from './services/role.service';
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from './role.dto';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() role: CreateRoleDTO): Promise<RoleDTO> {
    return await this.roleService.create(role);
  }

  @Get()
  async findAll(
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleDTO[]>> {
    return await this.roleService.findAll(pagination);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<RoleDTO> {
    return await this.roleService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() role: UpdateRoleDTO,
  ): Promise<RoleDTO> {
    return await this.roleService.update(id, role);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<RoleDTO> {
    return await this.roleService.delete(id);
  }
}
