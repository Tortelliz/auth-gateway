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
import { UserService } from './services/user.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './user.dto';
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

  @Delete(':id')
  @ApiDefaultResponse(UserDto)
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return await this.userService.deactivate(id);
  }

  @Get()
  @ApiDefaultResponse(PaginationResponseDTO<UserDto[]>)
  async findAll(
    @Query() pagination: PaginationRequestDTO,
  ): Promise<PaginationResponseDTO<UserDto[]>> {
    return await this.userService.findAll(pagination);
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
