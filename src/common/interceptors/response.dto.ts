import { IsBoolean, IsString } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class ResponseDTO<T> {
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
  @IsString()
  response_time: string;
  @ApiHideProperty()
  content: T;
}
