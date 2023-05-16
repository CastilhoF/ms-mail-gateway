import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { SendMailInputDto } from '../dtos/send-mail-input.dto';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';

class SendMail {
  public static operation: ApiOperationOptions = {
    description: 'Send Mail',
    summary: 'Send Mail',
    deprecated: false,
    tags: ['Mail'],
  };

  public static body: ApiBodyOptions = {
    type: () => SendMailInputDto,
    description: '',
    isArray: false,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: String,
    description: 'Mail sent',
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
      message: 'Error creating sender',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): MethodDecorator {
    return applyDecorators(
      ApiSecurity('x-api-key'),
      ApiBearerAuth('Bearer'),
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

export default SendMail;
