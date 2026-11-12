import {
  Body,
  Controller,
  Cookies,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
  UserDto,
  UserWithMessageDto,
} from './user.dto';
import { ApiDefaultResponse } from '../../lib/swagger/api-response.decorator';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { ViewerGuard } from '../../common/guards/viewer.guard';
import { StaffGuard } from '../../common/guards/staff.guard';
import { GuardService } from '../../common/guards/customs/services/guard.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly guardService: GuardService,
  ) {}

  @Post()
  @UseGuards(StaffGuard)
  @ApiDefaultResponse(UserWithMessageDto, false, HttpStatus.CREATED)
  async create(
    @Cookies('session_token') token: string,
    @Body() user: CreateUserDto,
  ): Promise<{ user: UserDto; message: string }> {
    await this.guardService.createUserPermissionsGuard(token, user.roles);
    return {
      user: await this.userService.create(user),
      message:
        'User created successfully, a welcome email was sent to the user',
    };
  }

  @UseGuards(ViewerGuard)
  @Put(':id')
  @ApiDefaultResponse(UserDto)
  async update(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    await this.guardService.selfGuard(token, id);
    return await this.userService.update(id, user);
  }

  @UseGuards(ViewerGuard)
  @Patch('update-password/:id')
  @ApiDefaultResponse(UserDto)
  async updatePassword(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passwords: UpdatePasswordDto,
  ): Promise<UserDto> {
    await this.guardService.selfGuard(token, id);
    return await this.userService.updatePassword(id, passwords);
  }

  @UseGuards(StaffGuard)
  @Delete(':id')
  @ApiDefaultResponse(UserDto)
  async deactivate(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDto> {
    await this.guardService.deleteUserPermissionsGuard(token, id);
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

  @UseGuards(ViewerGuard)
  @Get(':id')
  @ApiDefaultResponse(UserDto)
  async findOneById(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDto> {
    await this.guardService.selfGuard(token, id);
    return await this.userService.findOneById(id);
  }
}
