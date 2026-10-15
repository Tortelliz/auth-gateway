import { IsDate, IsString, IsUUID, MaxLength } from 'class-validator';

export class CompanyEntity {
  @IsUUID()
  id?: string;
  @IsString()
  cnpj: string;
  @IsString()
  @MaxLength(15)
  code: string;
  @IsString()
  @MaxLength(100)
  name: string;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at?: Date | null;
}
