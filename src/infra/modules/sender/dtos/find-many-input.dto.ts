import { ApiProperty } from '@nestjs/swagger';
import { DefaultSenderDto } from './default-sender.dto';
import { PaginationDto } from './pagination.dto';
import SendersDtosDocumentation from '../documentation/sender-dtos.documentation';
import { IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class FindManyInputDto {
  @IsNotEmpty()
  @Expose({ name: 'pagination' })
  @ApiProperty(SendersDtosDocumentation.pagination)
  pagination: PaginationDto;

  @IsNotEmpty()
  @Expose({ name: 'data' })
  @ApiProperty(SendersDtosDocumentation.data)
  data: Partial<DefaultSenderDto>;
}
