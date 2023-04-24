import { DefaultSenderDto } from './default-sender.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import FindManyResponseFieldsDocumentation from '../documentation/find-many-response-fields.documentation';

export class FindManyOutputDto {
  @IsNotEmpty()
  @Expose({ name: 'entities' })
  @ApiProperty(FindManyResponseFieldsDocumentation.entities)
  entities: DefaultSenderDto[];

  @IsNotEmpty()
  @Expose({ name: 'total' })
  @ApiProperty(FindManyResponseFieldsDocumentation.total)
  total: number;
}
