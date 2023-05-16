import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import SwaggerOptions from '../swagger/swagger.options';
import { WinstonModule } from 'nest-winston';
import CacheModule from './cache/cache.module';
import DatabaseModule from './database/database.module';
import { RequestMiddleware } from '../../core/middleware/request.middleware';
import httpProvider from '../http/provider/http.provider';
import eventOptions from '../event/event.options';
import environmentOptions from '../environment/environment.options';
import throttlerOptions from '../security/ddos/throttler.options';
import { winstonConfig } from '../log/winston.options';
import { EnvironmentModule } from './environment.module';
import CryptographyModule from './cryptography/cryptography.module';
import ClientModule from './client/client.module';
import { ThrottlerGuardProvider } from '../security/ddos/throttler.guard';
import AuthenticationModule from './authentication/authentication.module';
import { AuthorizationMiddleware } from '../../../infra/core/middleware/authorization.middleware';
import { AuthMiddleware } from '../middlewares/authorization-middleware.config';
import SenderModule from './sender/sender.module';
import MailModule from './mail/mail.module';
import QueueModule from './queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { bullProvider } from '../bull/provider/bull.provider';
import HealthCheckModule from './health-check/health-check.module';

@Module({
  imports: [
    BullModule.forRootAsync(bullProvider),
    ConfigModule.forRoot(environmentOptions),
    EventEmitterModule.forRoot(eventOptions),
    HttpModule.registerAsync(httpProvider),
    ThrottlerModule.forRoot(throttlerOptions),
    WinstonModule.forRoot(winstonConfig),
    CacheModule,
    CryptographyModule,
    DatabaseModule,
    EnvironmentModule,
    AuthenticationModule,
    ClientModule,
    SenderModule,
    MailModule,
    QueueModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [SwaggerOptions, ThrottlerGuardProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(...AuthMiddleware.configuration);
  }
}
