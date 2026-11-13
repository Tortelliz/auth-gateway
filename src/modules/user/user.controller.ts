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
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authGuard: AuthGuard,
  ) {}

  @Post()
  @ApiDefaultResponse(UserWithMessageDto, false, HttpStatus.CREATED)
  async create(
    @Cookies('session_token') token: string,
    @Body() user: CreateUserDto,
  ): Promise<{ user: UserDto; message: string }> {
    const validToken = await this.authGuard.checkIsValidToken(token);
    await this.authGuard.roles.isStaff(validToken);
    await this.authGuard.createUserPermissions(validToken, user.roles);
    return {
      user: await this.userService.create(user),
      message:
        'User created successfully, a welcome email was sent to the user',
    };
  }

  @Put(':id')
  @ApiDefaultResponse(UserDto)
  async update(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    const validToken = await this.authGuard.checkIsValidToken(token);
    await this.authGuard.roles.isViewer(validToken);
    this.authGuard.yourself(validToken, id);
    return await this.userService.update(id, user);
  }

  @Patch('update-password/:id')
  @ApiDefaultResponse(UserDto)
  async updatePassword(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passwords: UpdatePasswordDto,
  ): Promise<UserDto> {
    const validToken = await this.authGuard.checkIsValidToken(token);
    await this.authGuard.roles.isViewer(validToken);
    this.authGuard.yourself(validToken, id);
    return await this.userService.updatePassword(id, passwords);
  }

  @Delete(':id')
  @ApiDefaultResponse(UserDto)
  async deactivate(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDto> {
    const validToken = await this.authGuard.checkIsValidToken(token);
    await this.authGuard.roles.isStaff(validToken);
    await this.authGuard.deleteUserPermissions(validToken, id);
    return await this.userService.deactivate(id);
  }

  @Get('company/:company_id')
  @ApiDefaultResponse(PaginationResponseDTO<UserDto[]>)
  async findAll(
    @Cookies('session_token') token: string,
    @Param('company_id', ParseUUIDPipe) companyId: string,
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    const validToken = await this.authGuard.checkIsValidToken(token);
    await this.authGuard.roles.isStaff(validToken);
    const res = this.authGuard.findAllUsers(validToken);
    return await this.userService.findAll(
      companyId,
      pagination,
      res.user_id_to_omit,
    );
  }

  @Get(':id')
  @ApiDefaultResponse(UserDto)
  async findOneById(
    @Cookies('session_token') token: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDto> {
    const validToken = await this.authGuard.checkIsValidToken(token);
    await this.authGuard.roles.isViewer(validToken);
    this.authGuard.yourself(validToken, id);
    return await this.userService.findOneById(id);
  }
}
