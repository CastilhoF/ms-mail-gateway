import { ApiPropertyOptions } from '@nestjs/swagger';

class SendMailFieldsDocumentation {
  public static to: ApiPropertyOptions = {
    name: 'to',
    title: 'To',
    description: 'To - Email of the recipient',
    example: 'john.doe@domain.com',
    isArray: false,
    type: String,
    required: true,
  };

  public static from: ApiPropertyOptions = {
    name: 'from',
    title: 'From',
    description: 'From - Email of the sender [Internal input]',
    example: 'sender@domain.com',
    isArray: false,
    type: String,
    required: false,
  };

  public static subject: ApiPropertyOptions = {
    name: 'subject',
    title: 'Subject',
    description: 'Subject - Subject of the email',
    example: 'Hello, World!',
    isArray: false,
    type: String,
    required: true,
  };

  public static html: ApiPropertyOptions = {
    name: 'html',
    title: 'HTML',
    description: 'HTML - HTML content of the email',
    example: '<h1>Hello, World!</h1>',
    isArray: false,
    type: String,
    required: true,
  };

  public static text: ApiPropertyOptions = {
    name: 'text',
    title: 'Text',
    description: 'Text - Text content of the email',
    example: 'Hello, World!',
    isArray: false,
    type: String,
    required: true,
  };

  public static message: ApiPropertyOptions = {
    name: 'message',
    title: 'Message',
    description: 'Message - Message of the email',
    example: 'Hello, World!',
    isArray: false,
    type: String,
    required: true,
  };

  public static apiKey: ApiPropertyOptions = {
    name: 'apiKey',
    title: 'API Key',
    description: 'API Key - API Key of the sender [Internal input]',
    example: '0x00000',
    isArray: false,
    type: String,
    required: false,
  };

  public static service: ApiPropertyOptions = {
    name: 'service',
    title: 'Service',
    description: 'Service - Service of the sender [Internal input]',
    example: 'SendGrid',
    isArray: false,
    type: String,
    required: false,
  };
}

export default SendMailFieldsDocumentation;
