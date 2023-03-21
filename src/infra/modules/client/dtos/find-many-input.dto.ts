import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import ClientsDtosDocumentation from '../documentation/clients-dtos.documentation';
import { DefaultClientDto } from './default-client.dto';
import { PaginationDto } from './pagination.dto';

export class FindManyInputDto {
  @IsNotEmpty()
  @Expose({ name: 'pagination' })
  @ApiProperty(ClientsDtosDocumentation.pagination)
  pagination: PaginationDto;

  @IsNotEmpty()
  @Expose({ name: 'data' })
  @ApiProperty(ClientsDtosDocumentation.data)
  data: Partial<DefaultClientDto>;
}
