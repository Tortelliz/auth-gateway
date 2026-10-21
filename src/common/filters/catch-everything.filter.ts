import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';
import { ExceptionDTO } from '../dtos/exception.dto';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: ExceptionDTO = {
      timestamp: new Date().toLocaleString(),
      target: request.host,
      path: request.url,
      requester_ip: request.ip?.split(':')[3] || null,
      success: false,
      error: exception,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
