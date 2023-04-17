import { DefaultSenderDto } from './default-sender.dto';

export class FindManyOutputDto {
  entities: DefaultSenderDto[];
  total: number;
}
