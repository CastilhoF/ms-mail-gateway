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
  ApiSecurity,
} from '@nestjs/swagger';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';
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
      ApiSecurity('x-api-key'),
      ApiOperation(this.findManyOperation),
      ApiBody(this.findManyBody),
      ApiResponse(this.findManyResponse),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default FindManyClients;
