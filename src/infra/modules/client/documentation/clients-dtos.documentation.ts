import { ApiPropertyOptions } from '@nestjs/swagger';
import { DefaultClientDto } from '../dtos/default-client.dto';
import { PaginationDto } from '../dtos/pagination.dto';

class ClientsDtosDocumentation {
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
    type: () => DefaultClientDto,
    title: 'Data',
    description: 'Data',
    example: {
      host: 'https://example.com',
      client: 'Example',
    },
    isArray: false,
  };
}

export default ClientsDtosDocumentation;
