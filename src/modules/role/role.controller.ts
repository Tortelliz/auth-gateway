import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { RoleService } from './services/role.service';
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from './role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() role: CreateRoleDTO): Promise<RoleDTO> {
    try {
      return await this.roleService.create(role);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll(): Promise<RoleDTO[]> {
    try {
      return await this.roleService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<RoleDTO> {
    try {
      return await this.roleService.findById(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() role: UpdateRoleDTO,
  ): Promise<RoleDTO> {
    try {
      return await this.roleService.update(id, role);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<RoleDTO> {
    try {
      return await this.roleService.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
