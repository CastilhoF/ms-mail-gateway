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

class FindManySenders {
  public static operation: ApiOperationOptions = {
    description: 'Find Many Senders',
    summary: 'Find Many Senders',
    deprecated: false,
    tags: ['Sender'],
  };

  public static body: ApiBodyOptions = {
    type: () => FindManyInputDto,
    description: 'Find Many Senders by dto',
    isArray: false,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: () => FindManyOutputDto,
    description: 'Senders found',
    status: 200,
    isArray: true,
  };

  public static BadRequestSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 400,
      message: 'Senders not found',
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
      ApiOperation(this.operation),
      ApiBody(this.body),
      ApiResponse(this.response),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default FindManySenders;
