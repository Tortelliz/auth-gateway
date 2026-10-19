import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class UserEntity {
  @IsUUID()
  id: string;
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
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
}
