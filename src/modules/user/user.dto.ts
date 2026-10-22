import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyDTO } from '../company/company.dto';
import { RoleDTO } from '../role/role.dto';

export class UserDTO {
  @IsUUID()
  id: string;
  @IsEmail()
  email: string;
  @IsString()
  @MaxLength(50)
  first_name: string;
  @IsString()
  @MaxLength(50)
  last_name: string;
  @IsBoolean()
  active: boolean;
  @IsDate()
  last_login_at: Date | null;
  @IsNumber()
  failed_login_attempts: number;
  @IsBoolean()
  must_change_password: boolean;
  @IsArray()
  @Type(() => RoleDTO)
  roles: {
    role: RoleDTO;
  }[];
  @IsObject()
  @Type(() => CompanyDTO)
  company: CompanyDTO;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
}

export class CreateUserDTO {
  @IsEmail()
  email: string;
  @IsString()
  @MaxLength(50)
  first_name: string;
  @IsString()
  @MaxLength(50)
  last_name: string;
  @IsUUID()
  company_id: string;
  @IsArray()
  role_ids: string[];
}

export class UpdateUserDTO extends CreateUserDTO {}
