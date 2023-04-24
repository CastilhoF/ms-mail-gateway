import { ApiPropertyOptions } from '@nestjs/swagger';
import { DefaultSenderDto } from '../dtos/default-sender.dto';

class FindManyResponseFieldsDocumentation {
  public static entities: ApiPropertyOptions = {
    name: 'entities',
    title: 'Entities',
    description: 'Entities',
    example: [
      {
        uid: '0x00000',
        name: 'Example',
        email: 'example@domain.com',
        service: 'SendGrid',
        sender_api_key: '0x00000',
        client_uid: '0x00000',
        validated: true,
        created_at: '2020-01-01T00:00:00.000Z',
        updated_at: '2020-01-01T00:00:00.000Z',
      },
    ],
    isArray: true,
    type: () => DefaultSenderDto,
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
