import { IsDate, IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class RoleDto {
  @IsUUID()
  id: string;
  @IsString()
  code: string;
  @IsString()
  name: string;
  @IsString()
  description: string | null;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  code: string;
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  company_id: string;
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
  @IsString()
  @Length(0, 255)
  description: string | null;
}

export class UpdateRoleDto extends CreateRoleDto {}
