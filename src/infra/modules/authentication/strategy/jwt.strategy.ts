import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayloadInterface } from '../../../../app/shared/interfaces/jwt-payload.interface';
import {
  JwtStrategyOutputDto,
  SenderInformationDto,
} from '../dtos/jwt-strategy-output.dto';
import AuthenticationEnvironment from '../../../../infra/configuration/authentication/authentication.environment';
import FindOneClientByApiKeyUseCase from '../../../../domain/usecases/client/find-one-client-by-api-key.use-case';
import FindSenderByClientUidUseCase from '../../../../domain/usecases/sender/find-sender-by-client-uid.use-case';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly findOneClientByApiKeyUseCase: FindOneClientByApiKeyUseCase,
    private readonly authenticationEnvironment: AuthenticationEnvironment,
    private readonly findSenderByClientUidUseCase: FindSenderByClientUidUseCase,
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

    const sender = await this.findSenderByClientUidUseCase.execute(client.uid);

    const senderInformation = new SenderInformationDto(
      sender ? sender.email : '',
      sender ? sender.senderApiKey : '',
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
