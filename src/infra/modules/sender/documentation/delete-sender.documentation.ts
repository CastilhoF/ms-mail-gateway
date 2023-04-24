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

class DeleteSender {
  public static operation: ApiOperationOptions = {
    description: 'Delete Sender',
    summary: 'Delete Sender',
    deprecated: false,
    tags: ['Sender'],
  };

  public static param: ApiParamOptions = {
    name: 'uid',
    description: 'Delete Sender by uid',
    type: String,
  };

  public static response: ApiResponseOptions = {
    description: 'Sender deleted',
    status: 204,
    isArray: false,
  };

  public static notFoundSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 404,
      message: 'Sender not found',
      error: 'Not Found',
    },
  };

  public static internalErrorSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 500,
      message: 'Error deleting Sender',
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
        Exceptions.InternalServer(this.internalErrorSchema),
      ),
    );
  }
}

export default DeleteSender;
