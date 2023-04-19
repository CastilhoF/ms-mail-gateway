import { ApiPropertyOptions } from '@nestjs/swagger';

class SenderFieldsDocumentation {
  public static uid: ApiPropertyOptions = {
    name: 'uid',
    title: 'UID',
    description: 'UID - [UUID V4]',
    example: '0x00000',
    isArray: false,
    type: String,
    required: true,
  };

  public static senderName: ApiPropertyOptions = {
    name: 'name',
    title: 'Name',
    description: 'Name',
    example: 'Example',
    isArray: false,
    type: String,
    required: true,
  };

  public static email: ApiPropertyOptions = {
    name: 'email',
    title: 'Email',
    description: 'Email',
    example: 'exmaple@domain.com',
    isArray: false,
    type: String,
    required: true,
  };

  public static service: ApiPropertyOptions = {
    name: 'service',
    title: 'Service',
    description: 'Service',
    example: 'SendGrid',
    isArray: false,
    type: String,
    required: true,
  };

  public static senderApiKey: ApiPropertyOptions = {
    name: 'senderApiKey',
    title: 'Sender API Key',
    description: 'Sender API Key',
    example: '0x00000',
    isArray: false,
    type: String,
    required: true,
  };

  public static validated: ApiPropertyOptions = {
    name: 'validated',
    title: 'Validated',
    description: 'Validated',
    example: true,
    isArray: false,
    type: Boolean,
    required: true,
  };

  public static clientUid: ApiPropertyOptions = {
    name: 'clientUid',
    title: 'Client UID',
    description: 'Client UID',
    example: '0x00000',
    isArray: false,
    type: String,
    required: true,
  };

  public static createdAt: ApiPropertyOptions = {
    name: 'createdAt',
    title: 'Created At',
    description: 'Created At',
    example: '2020-01-01T00:00:00.000Z',
    isArray: false,
    type: Date,
    required: true,
  };

  public static updatedAt: ApiPropertyOptions = {
    name: 'updatedAt',
    title: 'Updated At',
    description: 'Updated At',
    example: '2020-01-01T00:00:00.000Z',
    isArray: false,
    type: Date,
    required: true,
  };
}

export default SenderFieldsDocumentation;
