import { ApiPropertyOptions } from '@nestjs/swagger';
import { DefaultClientDto } from '../dtos/default-client.dto';
import { PaginationDto } from '../dtos/pagination.dto';

class ClientsDtosDocumentation {
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
    description: 'Data is a partial of DefaultClientDto',
    example: {
      host: 'https://example.com',
      client: 'Example',
    },
    isArray: false,
  };
}

export default ClientsDtosDocumentation;
