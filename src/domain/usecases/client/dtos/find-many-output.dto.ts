import { DefaultClientDto } from './default-client.dto';

export class FindManyOutputDto {
  entities: DefaultClientDto[];
  total: number;
}
