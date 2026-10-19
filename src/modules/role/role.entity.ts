import { IsDate, IsString, IsUUID, MaxLength } from 'class-validator';

export class RoleEntity {
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
