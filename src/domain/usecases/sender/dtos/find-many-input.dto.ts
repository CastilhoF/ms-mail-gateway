import { DefaultSenderDto } from './default-sender.dto';
import { PaginationDto } from './pagination.dto';

export class FindManyInputDto {
  pagination: PaginationDto;
  data: Partial<DefaultSenderDto>;
}
