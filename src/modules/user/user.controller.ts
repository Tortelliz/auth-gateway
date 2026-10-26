import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  PaginationRequestDTO,
  PaginationResponseDTO,
} from '../../common/pagination/pagination.dto';
import { ApiDefaultResponse } from '../../lib/swagger/api-response.decorator';
import { UserService } from './services/user.service';
import {
  CreateUserDTO,
  SetPasswordDTO,
  UpdateUserDTO,
  UserDTO,
} from './user.dto';
import { ParseEmailPipe } from '../../common/pipes/parse-email.pipe';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiDefaultResponse(CreateUserDTO, false, HttpStatus.CREATED)
  async create(@Body() user: CreateUserDTO): Promise<UserDTO> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('find-all-by-company-id/:id')
  @ApiDefaultResponse(PaginationResponseDTO<UserDTO[]>)
  async findAllByCompanyId(
    @Query() pagination: PaginationRequestDTO,
    @Param('id', ParseUUIDPipe) companyId: string,
  ): Promise<PaginationResponseDTO<UserDTO[]>> {
    return await this.userService.findAllByCompanyId(companyId, pagination);
  }

  @Get('find-by-id/:id')
  @ApiDefaultResponse(UserDTO)
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDTO> {
    return await this.userService.findById(id);
  }

  @Get('find-by-email/:email')
  @ApiDefaultResponse(UserDTO)
  async findByEmail(
    @Param('email', ParseEmailPipe) email: string,
  ): Promise<UserDTO | null> {
    return await this.userService.findByEmail(email);
  }

  @Put(':id')
  @ApiDefaultResponse(UserDTO)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() company: UpdateUserDTO,
  ): Promise<UserDTO> {
    return await this.userService.update(id, company);
  }

  @Delete('deactivate/:id')
  @ApiDefaultResponse(UserDTO)
  async deactivate(@Param('id', ParseUUIDPipe) id: string): Promise<UserDTO> {
    return await this.userService.deactivate(id);
  }

  @Delete(':id')
  @ApiDefaultResponse(UserDTO)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<UserDTO> {
    return await this.userService.delete(id);
  }

  @Patch('set-password')
  @ApiDefaultResponse(UserDTO)
  async register(@Body() data: SetPasswordDTO): Promise<UserDTO> {
    return await this.userService.setPassword(data);
  }
}
