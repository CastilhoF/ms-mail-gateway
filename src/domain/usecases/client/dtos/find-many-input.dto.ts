import { DefaultClientDto } from './default-client.dto';
import { PaginationDto } from './pagination.dto';

export class FindManyInputDto {
  pagination: PaginationDto;
  data: Partial<DefaultClientDto>;
}
