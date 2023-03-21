import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import FindManyPagination from '../documentation/find-many-pagination.documentation';

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(FindManyPagination.page)
  page: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty(FindManyPagination.limit)
  limit: number;
}
