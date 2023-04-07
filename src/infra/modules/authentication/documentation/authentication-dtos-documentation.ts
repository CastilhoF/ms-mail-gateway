import { ApiPropertyOptions } from '@nestjs/swagger';
import { AuthenticateClientInputDto } from '../dtos/authenticate-client-input.dto';
import { AuthenticateClientOutputDto } from '../dtos/authenticate-client-output.dto';

class AuthenticationDtosDocumentation {
  public static input: ApiPropertyOptions = {
    name: 'input',
    title: 'Input',
    description: 'Input',
    example: {
      api_key: '0x00000',
    },
    isArray: false,
    type: () => AuthenticateClientInputDto,
    required: true,
  };

  public static output: ApiPropertyOptions = {
    name: 'output',
    title: 'Output',
    description: 'Output',
    example: {
      access_token: 'Bearer 0x00000',
    },
    isArray: false,
    type: () => AuthenticateClientOutputDto,
    required: true,
  };
}

export default AuthenticationDtosDocumentation;
