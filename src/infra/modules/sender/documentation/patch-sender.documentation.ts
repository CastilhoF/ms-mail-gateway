import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiBodyOptions,
  ApiParamOptions,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
  ApiSecurity,
} from '@nestjs/swagger';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';
import { DefaultSenderDto } from '../dtos/default-sender.dto';

class PatchSender {
  public static operation: ApiOperationOptions = {
    description: 'Patch Sender',
    summary: 'Patch Sender',
    deprecated: false,
    tags: ['Sender'],
  };

  public static body: ApiBodyOptions = {
    type: () => DefaultSenderDto,
    description: 'Patch Sender by partial dto',
    isArray: false,
    required: true,
  };

  public static param: ApiParamOptions = {
    name: 'uid',
    description: 'Sender uid',
    type: String,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: () => DefaultSenderDto,
    description: 'Sender patched',
    status: 200,
    isArray: false,
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
      ApiParam(this.param),
      ApiResponse(this.response),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default PatchSender;
