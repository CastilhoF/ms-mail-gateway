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

class FindById {
  public static findByUidOperation: ApiOperationOptions = {
    description: 'Find By Uid',
    summary: 'Find By Uid',
    deprecated: false,
    tags: ['Client'],
  };

  public static findByUidParam: ApiParamOptions = {
    name: 'uid',
    description: 'Client Uid',
    type: String,
    required: true,
  };

  public static findByUidResponse: ApiResponseOptions = {
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
      ApiOperation(this.findByUidOperation),
      ApiParam(this.findByUidParam),
      ApiResponse(this.findByUidResponse),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default FindById;
