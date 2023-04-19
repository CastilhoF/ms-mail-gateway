import { ApiPropertyOptions } from '@nestjs/swagger';
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import { PaginationDto } from '../dtos/pagination.dto';

class SendersDtosDocumentation {
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
    type: () => DefaultSenderDto,
    title: 'Data',
    description: 'Data is a partial of DefaultSenderDto',
    example: {
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
    isArray: false,
  };
}

export default SendersDtosDocumentation;
