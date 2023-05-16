import { ApiPropertyOptions } from '@nestjs/swagger';

class SendGridSenderAuthenticationFieldsDocumentation {
  public static email: ApiPropertyOptions = {
    name: 'email',
    title: 'Email',
    description: 'Email - Email of the sender',
    example: 'john.doe@domain.com',
    isArray: false,
    type: String,
    required: true,
  };

  public static apiKey: ApiPropertyOptions = {
    name: 'apiKey',
    title: 'API Key',
    description: 'API Key - API Key of the sender',
    example:
      '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',
    isArray: false,
    type: String,
    required: true,
  };
}

export default SendGridSenderAuthenticationFieldsDocumentation;
