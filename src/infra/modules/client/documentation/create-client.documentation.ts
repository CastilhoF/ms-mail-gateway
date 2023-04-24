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
  public static operation: ApiOperationOptions = {
    description: 'Create Client',
    summary: 'Create Client',
    deprecated: false,
    tags: ['Client'],
  };

  public static body: ApiBodyOptions = {
    type: () => CreateClientInputDto,
    description: 'Create Client by dto',
    isArray: false,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: () => CreateClientOutputDto,
    description: 'Client created',
    status: 201,
    isArray: false,
  };

  public static conflictSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 409,
      message: 'Client already exists',
      error: 'Conflict',
    },
  };

  public static badRequestSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 400,
      message: 'Client not found',
      error: 'Bad Request',
    },
  };

  public static internalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Error creating client',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): any {
    return applyDecorators(
      ApiSecurity('x-api-key'),
      ApiOperation(this.operation),
      ApiBody(this.body),
      ApiResponse(this.response),
      ApiConflictResponse(Exceptions.Conflict(this.conflictSchema)),
      ApiBadRequestResponse(Exceptions.BadRequest(this.badRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.internalErrorSchema),
      ),
    );
  }
}

export default CreateClient;
