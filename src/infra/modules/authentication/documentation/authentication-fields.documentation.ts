import { ApiPropertyOptions } from '@nestjs/swagger';

class AuthenticationFieldsDocumentation {
  public static apiKey: ApiPropertyOptions = {
    name: 'api_key',
    title: 'API Key',
    description: 'API Key',
    example: '0x00000',
    isArray: false,
    type: String,
    required: true,
  };

  public static apiSecret: ApiPropertyOptions = {
    name: 'api_secret',
    title: 'API Secret',
    description: 'API Secret',
    example: '0x00000',
    isArray: false,
    type: String,
    required: true,
  };

  public static accessToken: ApiPropertyOptions = {
    name: 'access_token',
    title: 'Access Token',
    description: 'Access Token',
    example: 'Bearer 0x00000',
    isArray: false,
    type: String,
    required: true,
  };

  // public static senderInformation: ApiPropertyOptions = {
  //   name: 'senderInformation',
  //   title: 'Sender Information',
  //   description: 'Sender Information',
  //   example: {
  //     email: 'client@domain.com',
  //     apiKey: '0x00000',
  //     validated: true,
  //   },
  //   isArray: false,
  //   type: () => SenderInformationDto,
  // };
}

export default AuthenticationFieldsDocumentation;
