import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiBodyOptions,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiSecurity,
} from '@nestjs/swagger';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';
import { CreateClientInputDto } from '../dtos/create-client-input.dto';
import { CreateClientOutputDto } from '../dtos/create-client-output.dto';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';

class CreateClient {
  public static createOperation: ApiOperationOptions = {
    description: 'Create Client',
    summary: 'Create Client',
    deprecated: false,
    tags: ['Client'],
  };

  public static createBody: ApiBodyOptions = {
    type: () => CreateClientInputDto,
    description: 'Create Client by dto',
    isArray: false,
    required: true,
  };

  public static createResponse: ApiResponseOptions = {
    type: () => CreateClientOutputDto,
    description: 'Client created',
    status: 201,
    isArray: false,
  };

  public static createConflictSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 409,
      message: 'Client already exists',
      error: 'Conflict',
    },
  };

  public static createBadRequestSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 400,
      message: 'Client not found',
      error: 'Bad Request',
    },
  };

  public static createInternalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Error creating client',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): any {
    return applyDecorators(
      ApiSecurity('x-api-key'),
      ApiOperation(this.createOperation),
      ApiBody(this.createBody),
      ApiResponse(this.createResponse),
      ApiConflictResponse(Exceptions.Conflict(this.createConflictSchema)),
      ApiBadRequestResponse(Exceptions.BadRequest(this.createBadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.createInternalErrorSchema),
      ),
    );
  }
}

export default CreateClient;
