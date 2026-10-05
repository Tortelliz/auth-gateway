import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Main');
  const port = configService.getOrThrow<number>('APP_PORT');
  const logLevel = configService.getOrThrow<string>('LOG_LEVEL');
  let levels: any = [];
  switch (logLevel) {
    case 'log':
      levels = ['log', 'fatal', 'error', 'warn'];
      break;
    case 'debug':
      levels = ['log', 'fatal', 'error', 'warn', 'debug'];
      break;
    default:
      levels = ['log', 'fatal', 'error', 'warn'];
  }
  logger.log(`App listening on port: ${port}`);
  logger.log(`Log level: ${logLevel}`);
  app.useLogger(levels);
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(port);
}
bootstrap();
