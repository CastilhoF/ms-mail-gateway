import { Injectable, Logger } from '@nestjs/common';
import BaseUseCase from '../base.use-case';
import ClientRepository from '../../../app/repositories/client/client.repository';
import ClientEntity from '../../entities/client/client.entity';
import { AuthenticateClientInputDto } from './dtos/authenticate-client-input.dto';
import { AuthenticateClientOutputDto } from './dtos/authenticate-client-output.dto';
import ApiSecretHasherInterface from '../../../app/shared/interfaces/api-secret-hasher.interface';
import JwtServiceInterface from '../../../app/shared/interfaces/jwt-service.interface';
import { JwtPayloadInterface } from '../../../app/shared/interfaces/jwt-payload.interface';

@Injectable()
export default class AuthenticateClientUseCase
  implements
    BaseUseCase<AuthenticateClientInputDto, AuthenticateClientOutputDto>
{
  private readonly logger: Logger = new Logger(AuthenticateClientUseCase.name);

  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly apiSecretHasher: ApiSecretHasherInterface,
    private readonly jwtService: JwtServiceInterface,
  ) {}

  async execute(
    input: AuthenticateClientInputDto,
  ): Promise<AuthenticateClientOutputDto> {
    const { apiKey, apiSecret } = input;

    if (!apiKey || !apiSecret) {
      this.logger.error('Invalid input data');
      throw new Error('Invalid input data');
    }

    const client: ClientEntity = await this.clientRepository.findOne({
      apiKey: apiKey,
    });

    const isApiSecretValid: boolean = await this.apiSecretHasher.compare(
      apiSecret,
      client.apiSecret,
    );

    if (client && isApiSecretValid) {
      const payload: JwtPayloadInterface = {
        apiKey: client.apiKey,
      };

      this.logger.debug(`Emitted JWT token to client: ${client.host}`);

      const token: string = await this.jwtService.sign(payload);

      return {
        accessToken: token,
      };
    }
  }
}
