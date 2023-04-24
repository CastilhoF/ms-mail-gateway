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
  ApiSecurity,
} from '@nestjs/swagger';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';

class DeleteClient {
  public static operation: ApiOperationOptions = {
    description: 'Delete Client',
    summary: 'Delete Client',
    deprecated: false,
    tags: ['Client'],
  };

  public static param: ApiParamOptions = {
    name: 'uid',
    description: 'Delete client by uid',
    type: String,
  };

  public static response: ApiResponseOptions = {
    description: 'Client deleted',
    status: 204,
    isArray: false,
  };

  public static notFoundSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 404,
      message: 'Client not found',
      error: 'Not Found',
    },
  };

  public static internalServerErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Error deleting client',
      error: 'Internal Server Error',
    },
  };

  public static Doc(): MethodDecorator & ClassDecorator {
    return applyDecorators(
      ApiSecurity('x-api-key'),
      ApiOperation(this.operation),
      ApiParam(this.param),
      ApiResponse(this.response),
      ApiNotFoundResponse(Exceptions.NotFound(this.notFoundSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.internalServerErrorSchema),
      ),
    );
  }
}

export default DeleteClient;
