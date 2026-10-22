import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { ApiDefaultResponse } from '../../lib/swagger/api-response.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiDefaultResponse(RoleDTO, false, HttpStatus.CREATED)
  async create(@Body() role: CreateRoleDTO): Promise<RoleDTO> {
    return await this.roleService.create(role);
  }

  @Get()
  @ApiDefaultResponse(PaginationResponseDTO<RoleDTO[]>)
  async findAll(
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleDTO[]>> {
    return await this.roleService.findAll(pagination);
  }

  @Get(':id')
  @ApiDefaultResponse(RoleDTO)
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<RoleDTO> {
    return await this.roleService.findById(id);
  }

  @Put(':id')
  @ApiDefaultResponse(RoleDTO)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() role: UpdateRoleDTO,
  ): Promise<RoleDTO> {
    return await this.roleService.update(id, role);
  }

  @Delete(':id')
  @ApiDefaultResponse(RoleDTO)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<RoleDTO> {
    return await this.roleService.delete(id);
  }
}
