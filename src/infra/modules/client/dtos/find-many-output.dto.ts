import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import FindManyResponseFieldsDocumentation from '../documentation/find-many-response-fields.documentation';
import { DefaultClientDto } from './default-client.dto';

export class FindManyOutputDto {
  @IsNotEmpty()
  @Expose({ name: 'entities' })
  @ApiProperty(FindManyResponseFieldsDocumentation.entities)
  entities: DefaultClientDto[];

  @IsNotEmpty()
  @Expose({ name: 'total' })
  @ApiProperty(FindManyResponseFieldsDocumentation.total)
  total: number;
}
