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
} from '@nestjs/swagger';
import Exceptions from './exceptions.documentation';
import { DefaultClientDto } from '../dtos/default-client.dto';
import { ExceptionsResponseSchemaDto } from '../dtos/exception-schema.dto';

class GetAllClients {
  public static getAllOperation: ApiOperationOptions = {
    description: 'Get All Clients',
    summary: 'Get All Clients',
    deprecated: false,
    tags: ['Client'],
  };

  public static getAllBody: ApiBodyOptions = {
    isArray: false,
    required: true,
  };

  public static getAllResponse: ApiResponseOptions = {
    type: () => DefaultClientDto,
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
