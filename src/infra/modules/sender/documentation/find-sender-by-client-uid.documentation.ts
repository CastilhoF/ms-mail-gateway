import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiSecurity,
} from '@nestjs/swagger';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';
import { DefaultSenderDto } from '../dtos/default-sender.dto';

class FindSenderByClientUid {
  public static operation: ApiOperationOptions = {
    description: 'Find Sender By Client Uid',
    summary: 'Find Sender By Client Uid',
    deprecated: false,
    tags: ['Sender'],
  };

  public static param: ApiParamOptions = {
    name: 'client-uid',
    description: 'Client Uid',
    type: String,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: () => DefaultSenderDto,
    description: 'Sender found',
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
      ApiParam(this.param),
      ApiResponse(this.response),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default FindSenderByClientUid;
