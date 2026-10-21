import { IsBoolean, IsString } from 'class-validator';

export class ExceptionDTO {
  @IsString()
  timestamp: string;
  @IsString()
  target: string;
  @IsString()
  path: string;
  @IsString()
  requester_ip: string | null;
  @IsBoolean()
  success: boolean;
  error: Error;
}
