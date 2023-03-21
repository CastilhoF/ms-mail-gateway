import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import ClientFieldsDocumentation from '../documentation/client-fields.documentation';
import { DefaultClientDto } from './default-client.dto';
import { PaginationDto } from './pagination.dto';

export class FindManyInputDto {
  @IsNotEmpty()
  @Expose({ name: 'pagination' })
  @ApiProperty(ClientFieldsDocumentation.pagination)
  pagination: PaginationDto;

  @IsNotEmpty()
  @Expose({ name: 'data' })
  @ApiProperty(ClientFieldsDocumentation.data)
  data: Partial<DefaultClientDto>;
}
