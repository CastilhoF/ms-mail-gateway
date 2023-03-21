import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import ClientFieldsDocumentation from '../documentation/client-fields.documentation';
import { DefaultClientDto } from './default-client.dto';

export class FindManyOutputDto {
  @IsNotEmpty()
  @Expose({ name: 'clients' })
  @ApiProperty(ClientFieldsDocumentation.entities)
  entities: DefaultClientDto[];

  @IsNotEmpty()
  @Expose({ name: 'total' })
  @ApiProperty(ClientFieldsDocumentation.total)
  total: number;
}
