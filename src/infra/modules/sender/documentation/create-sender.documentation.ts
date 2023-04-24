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
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import { CreateSenderInputDto } from '../dtos/create-sender-input.dto';

class CreateSender {
  public static operation: ApiOperationOptions = {
    description: 'Create Sender',
    summary: 'Create Sender',
    deprecated: false,
    tags: ['Sender'],
  };

  public static body: ApiBodyOptions = {
    type: () => CreateSenderInputDto,
    description: 'Create Sender by dto',
    isArray: false,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: () => DefaultSenderDto,
    description: 'Sender created',
    status: 201,
    isArray: false,
  };

  public static conflictSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 409,
      message: 'Sender already exists',
      error: 'Conflict',
    },
  };

  public static badRequestSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 400,
      message: 'Sender not found',
      error: 'Bad Request',
    },
  };

  public static internalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Error creating sender',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): MethodDecorator {
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

export default CreateSender;
