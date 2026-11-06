import { RoleDto } from '../role/role.dto';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UserDto {
  @IsUUID()
  id: string;
  @IsUUID()
  company_id: string;
  @IsEmail()
  email: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsDate()
  last_login_at: Date | null;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
  @IsArray()
  roles: {
    role: RoleDto;
  }[];
}

export class CreateUserDto {
  @IsUUID()
  @IsNotEmpty()
  company_id: string;
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 255)
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  first_name: string;
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  last_name: string;
  @IsArray()
  @IsNotEmpty()
  roles: string[];
}

export class UpdateUserDto extends CreateUserDto {}
