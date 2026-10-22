import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserEntity {
  @IsUUID()
  id: string;
  @IsUUID()
  company_id: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
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
  @Type(() => UserRoleEntity)
  roles: UserRoleEntity[];
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
}

export class UserRoleEntity {
  @IsUUID()
  id: string;
  @IsUUID()
  user_id: string;
  @IsUUID()
  role_id: string;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
}
