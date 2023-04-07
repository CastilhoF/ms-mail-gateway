import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import ClientRepository from '../../../../app/repositories/client/client.repository';
import SenderRepository from '../../../../app/repositories/sender/sender.repository';
import { JwtPayloadInterface } from '../../../../app/shared/interfaces/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  JwtStrategyOutputDto,
  SenderInformationDto,
} from '../dtos/jwt-strategy-output.dto';
import { ConfigService } from '@nestjs/config';
import ClientService from '../../client/services/client.service';
import AuthenticationEnvironment from '../../../../infra/configuration/authentication/authentication.environment';
import FindOneClientByApiKeyUseCase from '../../../../domain/usecases/client/find-one-client-by-api-key.use-case';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly findOneClientByApiKeyUseCase: FindOneClientByApiKeyUseCase,
    private readonly authenticationEnvironment: AuthenticationEnvironment,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authenticationEnvironment.jwtSecret,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<JwtStrategyOutputDto> {
    const { apiKey } = payload;
    const client = await this.findOneClientByApiKeyUseCase.execute(apiKey);

    if (!client) {
      throw new UnauthorizedException();
    }

    const sender = undefined; //await this.senderRepository.findOne({ name: client.client });

    const senderInformation = new SenderInformationDto(
      sender ? sender.email : '',
      sender ? sender.apiKey : '',
      sender ? sender.validated : false,
    );

    const clientPayload: JwtStrategyOutputDto = new JwtStrategyOutputDto(
      client.client,
      client.host,
      client.apiKey,
      senderInformation,
    );

    return clientPayload;
  }
}

export default JwtStrategy;
