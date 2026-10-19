import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class RoleDTO {
  @IsUUID()
  id: string;
  @IsString()
  @MaxLength(50)
  name: string;
  @IsString()
  @MaxLength(15)
  code: string;
  @IsString()
  @MaxLength(255)
  description: string | null;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date | null;
}

export class CreateRoleDTO {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  code: string;
  @IsString()
  description: string | null;
}

export class UpdateRoleDTO extends CreateRoleDTO {}
