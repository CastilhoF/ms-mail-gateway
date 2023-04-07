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
import { DefaultClientDto } from '../dtos/default-client.dto';

class FindByClient {
  public static findByClientOperation: ApiOperationOptions = {
    description: 'Find By Client',
    summary: 'Find By Client',
    deprecated: false,
    tags: ['Client'],
  };

  public static findByClientParam: ApiParamOptions = {
    name: 'client',
    description: 'Client Name',
    type: String,
    required: true,
  };

  public static findByClientResponse: ApiResponseOptions = {
    type: () => DefaultClientDto,
    description: 'Client found',
    status: 200,
    isArray: true,
  };

  public static BadRequestSchema: ExceptionsResponseSchemaDto = {
    example: {
      statusCode: 400,
      message: 'Clients not found',
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
      ApiOperation(FindByClient.findByClientOperation),
      ApiParam(FindByClient.findByClientParam),
      ApiResponse(FindByClient.findByClientResponse),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default FindByClient;
