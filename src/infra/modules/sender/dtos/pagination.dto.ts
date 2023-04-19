import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import FindManyPagination from '../documentation/find-many-pagination.documentation';

export class PaginationDto {
  @IsNumber()
  @Expose({ name: 'page' })
  @ApiProperty(FindManyPagination.page)
  page: number;

  @IsNumber()
  @Expose({ name: 'limit' })
  @ApiProperty(FindManyPagination.limit)
  limit: number;
}
