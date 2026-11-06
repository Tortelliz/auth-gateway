import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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
  code: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string | null;
}

export class UpdateRoleDto extends CreateRoleDto {}
