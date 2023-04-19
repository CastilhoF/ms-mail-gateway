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
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';

class ChangeSenderValidation {
  public static operation: ApiOperationOptions = {
    description: 'Change Sender Validation',
    summary: 'Change Sender Validation',
    deprecated: false,
    tags: ['Sender'],
  };

  public static body: ApiBodyOptions = {
    type: () => DefaultSenderDto,
    description: 'Change Sender Validation by dto',
    isArray: false,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: () => DefaultSenderDto,
    description: 'Sender Validation changed',
    status: 200,
    isArray: false,
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
      message: 'Error changing sender validation',
      error: 'Internal Server Error',
    },
  };

  public static changeSenderValidation(): MethodDecorator & ClassDecorator {
    return applyDecorators(
      ApiSecurity('x-api-key'),
      ApiOperation(this.operation),
      ApiBody(this.body),
      ApiResponse(this.response),
      ApiBadRequestResponse(Exceptions.BadRequest(this.badRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.internalErrorSchema),
      ),
    );
  }
}

export default ChangeSenderValidation;
