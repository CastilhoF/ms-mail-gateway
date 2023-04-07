import { ApiPropertyOptions } from '@nestjs/swagger';

class JwtStrategyFieldsDocumentation {
  public static email: ApiPropertyOptions = {
    name: 'email',
    title: 'Email',
    description: 'Email',
    example: 'client@domain.com',
    isArray: false,
    type: String,
    required: false,
  };

  public static senderApiKey: ApiPropertyOptions = {
    name: 'senderApiKey',
    title: 'Sender API Key',
    description: 'Sender API Key of Sendgrid',
    example: '0x00000',
    isArray: false,
    type: String,
    required: false,
  };

  public static validated: ApiPropertyOptions = {
    name: 'validated',
    title: 'Validated',
    description: 'Validated by Sendgrid',
    example: true,
    isArray: false,
    type: Boolean,
    required: false,
  };

  public static client: ApiPropertyOptions = {
    name: 'client',
    title: 'Client',
    description: 'Client',
    example: 'Client Name',
    isArray: false,
    type: String,
    required: true,
  };

  public static host: ApiPropertyOptions = {
    name: 'host',
    title: 'Host',
    description: 'Host',
    example: 'https://domain.com',
    isArray: false,
    type: String,
    required: true,
  };

  public static apiKey: ApiPropertyOptions = {
    name: 'apiKey',
    title: 'API Key',
    description: 'API Key',
    example: '0x00000',
    isArray: false,
    type: String,
    required: true,
  };
}

export default JwtStrategyFieldsDocumentation;
