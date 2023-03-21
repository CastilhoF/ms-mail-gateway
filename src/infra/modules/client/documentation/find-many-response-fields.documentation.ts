import { ApiPropertyOptions } from '@nestjs/swagger';
import { DefaultClientDto } from '../dtos/default-client.dto';

class FindManyResponseFieldsDocumentation {
  public static entities: ApiPropertyOptions = {
    name: 'entities',
    title: 'Entities',
    description: 'Entities',
    example: [
      {
        uid: '0x00000',
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

export default FindManyResponseFieldsDocumentation;
