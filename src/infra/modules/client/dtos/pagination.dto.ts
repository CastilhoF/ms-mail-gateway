import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import ClientsDtosDocumentation from '../documentation/clients-dtos.documentation';

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(ClientsDtosDocumentation.page)
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(ClientsDtosDocumentation.limit)
  limit: number;
}
