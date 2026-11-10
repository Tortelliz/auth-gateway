import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import {
  CreateUserDto,
  SetPasswordDto,
  UpdateUserDto,
  UserDto,
} from './user.dto';
import { ApiDefaultResponse } from '../../lib/swagger/api-response.decorator';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { ParseEmailPipe } from '../../common/pipes/parse-email.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiDefaultResponse(UserDto, false, HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(user);
  }

  @Put(':id')
  @ApiDefaultResponse(UserDto)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.userService.update(id, user);
  }

  @Patch('set-password/:id')
  @ApiDefaultResponse(UserDto)
  async setPassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passwords: SetPasswordDto,
  ): Promise<UserDto> {
    return await this.userService.setPassword(id, passwords);
  }

  @Delete(':id')
  @ApiDefaultResponse(UserDto)
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return await this.userService.deactivate(id);
  }

  @Get('company/:company_id')
  @ApiDefaultResponse(PaginationResponseDTO<UserDto[]>)
  async findAll(
    @Param('company_id', ParseUUIDPipe) companyId: string,
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return await this.userService.findAll(companyId, pagination);
  }

  @Get(':id')
  @ApiDefaultResponse(UserDto)
  async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return await this.userService.findOneById(id);
  }

  @Get('email/:email')
  @ApiDefaultResponse(UserDto)
  async findOneByEmail(
    @Param('email', ParseEmailPipe) email: string,
  ): Promise<UserDto> {
    return await this.userService.findOneByEmail(email);
  }
}
