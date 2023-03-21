import { ApiPropertyOptions } from '@nestjs/swagger';

class ClientFieldsDocumentation {
  public static id: ApiPropertyOptions = {
    name: 'id',
    title: 'ID',
    description: 'ID',
    example: '0x00000',
    isArray: false,
    type: String,
    required: true,
  };

  public static host: ApiPropertyOptions = {
    name: 'host',
    title: 'Host',
    description: 'Host',
    example: 'https://example.com',
    isArray: false,
    type: String,
    required: true,
  };

  public static client: ApiPropertyOptions = {
    name: 'client',
    title: 'Client',
    description: 'Client',
    example: 'Example',
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

  public static apiSecret: ApiPropertyOptions = {
    name: 'apiSecret',
    title: 'API Secret',
    description: 'API Secret',
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

export default ClientFieldsDocumentation;
