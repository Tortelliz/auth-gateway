import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    response.status(status).json({
      timestamp: new Date().toLocaleString(),
      path: request.url,
      success: false,
      error: {
        code: status,
        stack: exception.stack,
        cause: exception.cause,
        name: exception.name,
        message: exception.message,
      },
    });
  }
}
