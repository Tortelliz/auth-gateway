import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';

export class SessionEntity {
  @IsUUID()
  id: string;
  @IsUUID()
  user_id: string;
  @IsString()
  hash_token: string;
  @IsBoolean()
  revoked: boolean;
  @IsDate()
  created_at: Date;
  @IsDate()
  expires_at: Date;
  @IsDate()
  revoked_at: Date | null;
}
