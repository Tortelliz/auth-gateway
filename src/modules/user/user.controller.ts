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
  UserWithMessageDto,
  UpdatePasswordDto,
  UpdateUserDto,
  UserDto,
} from './user.dto';
import { ApiDefaultResponse } from '../../lib/swagger/api-response.decorator';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { ParseEmailPipe } from '../../common/pipes/parse-email.pipe';
import { ViewerGuard } from '../../common/guards/viewer.guard';
import { StaffGuard } from '../../common/guards/staff.guard';
import { AuthService } from '../auth/services/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseGuards(StaffGuard)
  @ApiDefaultResponse(UserWithMessageDto, false, HttpStatus.CREATED)
  async create(
    @Cookies('session_token') token: string,
    @Body() user: CreateUserDto,
  ): Promise<{ user: UserDto; message: string }> {
    const requesterUser = await this.userService.findOneById(
      (await this.authService.findSessionByToken(token)).user_id,
    );
    return {
      user: await this.userService.create(user, requesterUser),
      message:
        'User created successfully, a welcome email was sent to the user',
    };
  }

  @UseGuards(ViewerGuard)
  @Put(':id')
  @ApiDefaultResponse(UserDto)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.userService.update(id, user);
  }

  @UseGuards(ViewerGuard)
  @Patch('update-password/:id')
  @ApiDefaultResponse(UserDto)
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() passwords: UpdatePasswordDto,
  ): Promise<UserDto> {
    return await this.userService.updatePassword(id, passwords);
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
