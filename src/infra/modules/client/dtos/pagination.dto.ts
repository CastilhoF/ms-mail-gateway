import { ApiProperty } from '@nestjs/swagger';
import ClientFieldsDocumentation from '../documentation/client-fields.documentation';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(ClientFieldsDocumentation.page)
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(ClientFieldsDocumentation.limit)
  limit: number;
}
