import { Injectable } from '@nestjs/common';
import AuthenticateClientUseCase from '../../../../domain/usecases/client/authenticate-client.use-case';
import { errorCallback } from '../../helpers/exceptions/exception.callback';
import { AuthenticateClientOutputDto } from '../../../../domain/usecases/client/dtos/authenticate-client-output.dto';
import { AuthenticateClientInputDto } from '../../../../domain/usecases/client/dtos/authenticate-client-input.dto';

@Injectable()
class AuthenticationService {
  constructor(
    private readonly authenticateClientUseCase: AuthenticateClientUseCase,
  ) {}
  async signIn(
    input: AuthenticateClientInputDto,
  ): Promise<AuthenticateClientOutputDto> {
    const result = await this.authenticateClientUseCase
      .execute(input)
      .catch(errorCallback);

    return result;
  }
}

export default AuthenticationService;
