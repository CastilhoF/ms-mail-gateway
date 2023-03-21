import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { ExceptionsResponseSchemaDto } from '../dtos/exception-schema.dto';
import Exceptions from './exceptions.documentation';

class DeleteClient {
  public static deleteOperation: ApiOperationOptions = {
    description: 'Delete Client',
    summary: 'Delete Client',
    deprecated: false,
    tags: ['Client'],
  };

  public static deleteParam: ApiParamOptions = {
    name: 'id',
    description: 'Delete client by id',
    type: String,
  };

  public static deleteResponse: ApiResponseOptions = {
    description: 'Client deleted',
    status: 204,
    isArray: false,
  };

  public static deleteNotFoundSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 404,
      message: 'Client not found',
      error: 'Not Found',
    },
  };

  public static deleteInternalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Error deleting client',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): MethodDecorator & ClassDecorator {
    return applyDecorators(
      ApiOperation(DeleteClient.deleteOperation),
      ApiParam(DeleteClient.deleteParam),
      ApiResponse(DeleteClient.deleteResponse),
      ApiNotFoundResponse(Exceptions.NotFound(this.deleteNotFoundSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.deleteInternalErrorSchema),
      ),
    );
  }
}

export default DeleteClient;
