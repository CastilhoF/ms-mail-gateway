import { ApiPropertyOptions } from '@nestjs/swagger';
import { DefaultClientDto } from '../dtos/default-client.dto';
import { PaginationDto } from '../dtos/pagination.dto';

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

  public static page: ApiPropertyOptions = {
    name: 'page',
    title: 'Page',
    description: 'Page',
    example: 1,
    isArray: false,
    type: Number,
    required: true,
  };

  public static limit: ApiPropertyOptions = {
    name: 'limit',
    title: 'Limit',
    description: 'Limit',
    example: 10,
    isArray: false,
    type: Number,
    required: true,
  };

  public static pagination: ApiPropertyOptions = {
    name: 'pagination',
    title: 'Pagination',
    description: 'Pagination',
    example: {
      page: 1,
      limit: 10,
    },
    isArray: false,
    type: () => PaginationDto,
  };

  public static data: ApiPropertyOptions = {
    name: 'data',
    title: 'Data',
    description: 'Data',
    example: {
      host: 'https://example.com',
      client: 'Example',
    },
    isArray: false,
    type: () => DefaultClientDto,
  };

  public static entities: ApiPropertyOptions = {
    name: 'entities',
    title: 'Entities',
    description: 'Entities',
    example: [
      {
        id: '0x00000',
        host: 'https://example.com',
        client: 'Example',
        apiKey: '0x00000',
        apiSecret: '0x00000',
        createdAt: '2020-01-01T00:00:00.000Z',
        updatedAt: '2020-01-01T00:00:00.000Z',
      },
    ],
    isArray: true,
    type: () => DefaultClientDto,
  };

  public static total: ApiPropertyOptions = {
    name: 'total',
    title: 'Total',
    description: 'Total',
    example: 1,
    isArray: false,
    type: Number,
  };
}

export default ClientFieldsDocumentation;
