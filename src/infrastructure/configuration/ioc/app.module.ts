import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';
import { WinstonModule } from 'nest-winston';
import CacheModule from './cache/cache.module';
import DatabaseModule from './database/database.module';
import { RequestMiddleware } from '../../core/middleware/request.middleware';
import httpProvider from '../http/provider/http.provider';
import eventOptions from '../event/event.options';
import environmentOptions from '../environment/environment.options';
import SwaggerOptions from '../swagger/swagger.options';
import throttlerOptions from '../security/ddos/throttler.options';
import { winstonConfig } from '../log/winston.options';
import { EnvironmentModule } from './environment.module';

@Module({
  imports: [
    ConfigModule.forRoot(environmentOptions),
    EventEmitterModule.forRoot(eventOptions),
    HttpModule.registerAsync(httpProvider),
    ThrottlerModule.forRoot(throttlerOptions),
    WinstonModule.forRoot(winstonConfig),
    CacheModule,
    DatabaseModule,
    EnvironmentModule,
  ],
  controllers: [],
  providers: [SwaggerOptions],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
