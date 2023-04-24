import { Module, Global } from '@nestjs/common';
import jwtServiceProvider from './providers/jwt-service.provider';
import AuthenticationService from '../../../../infra/modules/authentication/services/authentication.service';
import AuthenticationController from '../../../../infra/modules/authentication/controllers/authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import JwtStrategy from '../../../../infra/modules/authentication/strategy/jwt.strategy';
import {
  configStrategy,
  jwtConfigOptions,
} from '../../authentication/jwt-config.options';
import AuthenticateClientUseCase from '../../../../domain/usecases/client/authenticate-client.use-case';
import AuthenticationEnvironment from '../../authentication/authentication.environment';
import { ClientRepositoryProvider } from '../client/providers/client-repository.provider';
import { SenderRepositoryProvider } from '../sender/providers/sender-repository.provider';
import FindOneClientByApiKeyUseCase from '../../../../domain/usecases/client/find-one-client-by-api-key.use-case';
import FindSenderByClientUidUseCase from '../../../../domain/usecases/sender/find-sender-by-client-uid.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { clientSchemaOptions } from '../database/schemas/client.schema';
import { senderSchemaOptions } from '../database/schemas/sender.schema';

@Global()
@Module({
  imports: [
    PassportModule.register(configStrategy),
    JwtModule.registerAsync(jwtConfigOptions),
    MongooseModule.forFeature([clientSchemaOptions]),
    MongooseModule.forFeature([senderSchemaOptions]),
  ],
  controllers: [AuthenticationController],
  providers: [
    jwtServiceProvider,
    AuthenticationService,
    JwtStrategy,
    AuthenticateClientUseCase,
    AuthenticationEnvironment,
    ClientRepositoryProvider,
    SenderRepositoryProvider,
    FindOneClientByApiKeyUseCase,
    FindSenderByClientUidUseCase,
  ],
  exports: [jwtServiceProvider, AuthenticationService, JwtStrategy],
})
export default class AuthenticationModule {}
