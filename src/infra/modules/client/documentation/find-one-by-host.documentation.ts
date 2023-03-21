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
} from '@nestjs/swagger';
import Exceptions from './exceptions.documentation';
import { ExceptionsResponseSchemaDto } from '../dtos/exception-schema.dto';
import { DefaultClientDto } from '../dtos/default-client.dto';

class FindByHost {
  public static findByHostOperation: ApiOperationOptions = {
    description: 'Find By Host',
    summary: 'Find By Host',
    deprecated: false,
    tags: ['Client'],
  };

  public static findByHostParam: ApiParamOptions = {
    name: 'host',
    description: 'Client Host',
    type: String,
    required: true,
  };

  public static findByHostResponse: ApiResponseOptions = {
    type: () => DefaultClientDto,
    description: 'Client found',
    status: 200,
    isArray: true,
  };

  public static BadRequestSchema: ExceptionsResponseSchemaDto = {
    example: [
      {
        statusCode: 400,
        message: 'Clients not found',
        error: 'Bad Request',
      },
    ],
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
      ApiOperation(FindByHost.findByHostOperation),
      ApiParam(FindByHost.findByHostParam),
      ApiResponse(FindByHost.findByHostResponse),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default FindByHost;
