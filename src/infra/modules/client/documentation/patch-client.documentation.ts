import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiBodyOptions,
  ApiParamOptions,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiOperationOptions,
  ApiResponse,
  ApiResponseOptions,
} from '@nestjs/swagger';
import Exceptions from './exceptions.documentation';
import { ExceptionsResponseSchemaDto } from '../dtos/exception-schema.dto';
import { DefaultClientDto } from '../dtos/default-client.dto';

class PatchClient {
  public static patchClientOperation: ApiOperationOptions = {
    description: 'Patch Client',
    summary: 'Patch Client',
    deprecated: false,
    tags: ['Client'],
  };

  public static patchClientBody: ApiBodyOptions = {
    type: () => DefaultClientDto,
    description: 'Patch Client by partial dto',
    isArray: false,
    required: true,
  };

  public static patchClientParam: ApiParamOptions = {
    name: 'uid',
    description: 'Client uid',
    type: String,
    required: true,
  };

  public static patchClientResponse: ApiResponseOptions = {
    type: () => DefaultClientDto,
    description: 'Client patched',
    status: 200,
    isArray: false,
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
      ApiOperation(PatchClient.patchClientOperation),
      ApiBody(PatchClient.patchClientBody),
      ApiParam(PatchClient.patchClientParam),
      ApiResponse(PatchClient.patchClientResponse),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default PatchClient;
