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
import { DefaultClientDto } from '../dtos/default-client.dto';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';

class GetAllClients {
  public static getAllOperation: ApiOperationOptions = {
    description: 'Get All Clients',
    summary: 'Get All Clients',
    deprecated: false,
    tags: ['Client'],
  };

  public static getAllBody: ApiBodyOptions = {
    description: 'Get All Clients',
    isArray: false,
    required: true,
  };

  public static getAllResponse: ApiResponseOptions = {
    type: () => DefaultClientDto,
    description: 'Clients found',
    status: 200,
    isArray: true,
  };

  public static createConflictSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 409,
      message: 'Client already exists',
      error: 'Conflict',
    },
  };

  public static createBadRequestSchema: ExceptionsResponseSchemaDto = {
    example: [
      {
        statusCode: 400,
        message: 'Clients not found',
        error: 'Bad Request',
      },
    ],
  };

  public static createInternalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Internal Server Error',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): any {
    return applyDecorators(
      ApiSecurity('x-api-key'),
      ApiOperation(this.getAllOperation),
      ApiBody(this.getAllBody),
      ApiResponse(this.getAllResponse),
      ApiBadRequestResponse(Exceptions.BadRequest(this.createBadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.createInternalErrorSchema),
      ),
    );
  }
}

export default GetAllClients;
