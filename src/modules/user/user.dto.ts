import { RoleDto } from '../role/role.dto';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
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

export class SetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/, {
    message:
      'password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
  @IsString()
  @IsNotEmpty()
  @Length(8, 30)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])/, {
    message:
      'confirm_password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  confirm_password: string;
}
