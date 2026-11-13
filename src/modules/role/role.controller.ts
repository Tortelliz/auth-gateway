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
import { CreateRoleDto, RoleDto, UpdateRoleDto } from './role.dto';
import { ApiDefaultResponse } from '../../lib/swagger/api-response.decorator';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiDefaultResponse(RoleDto, false, HttpStatus.CREATED)
  async create(@Body() role: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.create(role);
  }

  @Put(':id')
  @ApiDefaultResponse(RoleDto)
  async update(
    @Param('id') id: string,
    @Body() role: UpdateRoleDto,
  ): Promise<RoleDto> {
    return await this.roleService.update(id, role);
  }

  @Delete(':id')
  @ApiDefaultResponse(RoleDto)
  async delete(@Param('id') id: string): Promise<RoleDto> {
    return this.roleService.delete(id);
  }

  @Get(':id')
  @ApiDefaultResponse(RoleDto)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<RoleDto> {
    return await this.roleService.findOne(id);
  }

  @Get('company')
  @ApiDefaultResponse(RoleDto, true)
  async findByCompany(
    @Query('id', ParseUUIDPipe) companyId: string,
  ): Promise<RoleDto[]> {
    return await this.roleService.findByCompanyId(companyId);
  }

  @Get()
  @ApiDefaultResponse(PaginationResponseDTO<RoleDto[]>)
  async findAll(
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<RoleDto[]>> {
    try {
      return await this.roleService.findAll(pagination);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
