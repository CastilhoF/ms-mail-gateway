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
import { AuthenticateClientInputDto } from '../dtos/authenticate-client-input.dto';
import { AuthenticateClientOutputDto } from '../dtos/authenticate-client-output.dto';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';

class SignIn {
  public static signInOperation: ApiOperationOptions = {
    description: 'Sign In',
    summary: 'Sign In',
    deprecated: false,
    tags: ['Authentication'],
  };

  public static signInBody: ApiBodyOptions = {
    type: () => AuthenticateClientInputDto,
    description: 'Sign In by dto',
    isArray: false,
    required: true,
  };

  public static signInResponse: ApiResponseOptions = {
    type: () => AuthenticateClientOutputDto,
    description: 'Client authenticated',
    status: 200,
    isArray: false,
  };

  public static signInBadRequestSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 400,
      message: 'Client not found',
      error: 'Bad Request',
    },
  };

  public static signInInternalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Error creating client',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): MethodDecorator {
    return applyDecorators(
      ApiSecurity('x-api-key'),
      ApiOperation(SignIn.signInOperation),
      ApiBody(SignIn.signInBody),
      ApiResponse(SignIn.signInResponse),
      ApiBadRequestResponse(
        Exceptions.BadRequest(SignIn.signInBadRequestSchema),
      ),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(SignIn.signInInternalErrorSchema),
      ),
    );
  }
}

export default SignIn;
