import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { ResponseDTO } from '../dtos/response.dto';

export interface Response<T> {
  content: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseDTO<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDTO<T>> {
    const startTime = Date.now();
    const timestamp = new Date().toLocaleString();
    const request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data: T) => ({
        timestamp,
        target: request.host,
        path: request.url,
        requester_ip: request.ip?.split(':')[3] || null,
        success: true,
        response_time: `${Date.now() - startTime}ms`,
        content: data,
      })),
    );
  }
}
