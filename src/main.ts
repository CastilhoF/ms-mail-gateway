import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './infra/configuration/ioc/app.module';
import SwaggerOptions from './infra/configuration/swagger/swagger.options';
import validationGlobalPipe from './infra/configuration/validation/validation.options';
import versioningOptions from './infra/configuration/versioning/versioning.options';

/**
 * Nest Bootstrap
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  setupMiddlewares(app);
  await start(app);
}

/**
 * Init Middlewares
 * @param app Nest Instance
 */
function setupMiddlewares(app: INestApplication) {
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors();
  app.enableVersioning(versioningOptions());
  app.useGlobalPipes(validationGlobalPipe());
}

/**
 * Start Application
 * @param app Nest Instance
 */
async function start(app: INestApplication) {
  const configService = app.get(ConfigService);
  const host = configService.get('APP_HOST');
  const port = configService.get('APP_PORT');

  app.setGlobalPrefix(configService.get('APP_GLOBAL_PREFIX'));
  app.get(SwaggerOptions).setup(app);

  await app.listen(port, host, async () => {
    Logger.log(`App listen on ${await app.getUrl()}`, 'NestApplication');
  });
}

bootstrap();
