import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiBodyOptions,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import Exceptions from './exceptions.documentation';
import { ExceptionsResponseSchemaDto } from '../dtos/exception-schema.dto';
import { FindManyOutputDto } from '../dtos/find-many-output.dto';
import { FindManyInputDto } from '../dtos/find-many-input.dto';

class FindManyClients {
  public static findManyOperation: ApiOperationOptions = {
    description: 'Find Many Clients',
    summary: 'Find Many Clients',
    deprecated: false,
    tags: ['Client'],
  };

  public static findManyBody: ApiBodyOptions = {
    type: () => FindManyInputDto,
    description: 'Find Many Clients by dto',
    isArray: false,
    required: true,
  };

  public static findManyResponse: ApiResponseOptions = {
    type: () => FindManyOutputDto,
    description: 'Clients found',
    status: 200,
    isArray: true,
  };

  public static BadRequestSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 400,
      message: 'Clients not found',
      error: 'Bad Request',
    },
  };

  public static InternalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): MethodDecorator {
    return applyDecorators(
      ApiOperation(FindManyClients.findManyOperation),
      ApiBody(FindManyClients.findManyBody),
      ApiResponse(FindManyClients.findManyResponse),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default FindManyClients;
