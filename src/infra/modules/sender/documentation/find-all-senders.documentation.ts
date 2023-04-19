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
import { DefaultSenderDto } from '../dtos/default-sender.dto';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';

class FindAllSenders {
  public static operation: ApiOperationOptions = {
    description: 'Get All Senders',
    summary: 'Get All Senders',
    deprecated: false,
    tags: ['Sender'],
  };

  public static body: ApiBodyOptions = {
    description: 'Get All Senders',
    isArray: false,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: () => DefaultSenderDto,
    description: 'Senders found',
    status: 200,
    isArray: true,
  };

  public static badRequestSchema: ExceptionsResponseSchemaDto = {
    example: [
      {
        statusCode: 400,
        message: 'Senders not found',
        error: 'Bad Request',
      },
    ],
  };

  public static internalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): any {
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

export default FindAllSenders;
