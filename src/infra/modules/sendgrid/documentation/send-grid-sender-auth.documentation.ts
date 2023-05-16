import { SendGridVerifyMailInputDto } from '../dtos/verify-email-input.dto';
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
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import { applyDecorators } from '@nestjs/common';

class SendGridSenderAuthentication {
  public static operation: ApiOperationOptions = {
    description: 'Sender Authentication - SendGrid',
    summary: 'Sender Authentication',
    deprecated: false,
    tags: ['SendGrid'],
  };

  public static body: ApiBodyOptions = {
    type: () => SendGridVerifyMailInputDto,
    description: 'Payload to authentication sender e-mail',
    isArray: false,
    required: true,
  };

  public static response: ApiResponseOptions = {
    type: String,
    description: 'Email validated successfully',
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

export default SendGridSenderAuthentication;
