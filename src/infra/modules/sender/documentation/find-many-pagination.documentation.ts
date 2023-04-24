import { ApiPropertyOptions } from '@nestjs/swagger';

class FindManyPagination {
  public static page: ApiPropertyOptions = {
    name: 'page',
    title: 'Page',
    description: 'Page',
    example: 1,
    isArray: false,
    type: Number,
    required: true,
  };

  public static limit: ApiPropertyOptions = {
    name: 'limit',
    title: 'Limit',
    description: 'Limit',
    example: 10,
    isArray: false,
    type: Number,
    required: true,
  };
}

export default FindManyPagination;
