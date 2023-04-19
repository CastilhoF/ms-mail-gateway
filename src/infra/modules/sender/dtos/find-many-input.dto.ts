import { ApiProperty } from '@nestjs/swagger';
import { DefaultSenderDto } from './default-sender.dto';
import { PaginationDto } from './pagination.dto';
import SendersDtosDocumentation from '../documentation/sender-dtos.documentation';

export class FindManyInputDto {
  @ApiProperty(SendersDtosDocumentation.pagination)
  pagination: PaginationDto;

  @ApiProperty(SendersDtosDocumentation.data)
  data: Partial<DefaultSenderDto>;
}
