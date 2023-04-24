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
  ApiSecurity,
} from '@nestjs/swagger';
import { ExceptionsResponseSchemaDto } from '../../../../app/shared/documentation/dtos/exception-schema.dto';
import Exceptions from '../../../../app/shared/documentation/exceptions.documentation';
import { DefaultClientDto } from '../dtos/default-client.dto';

class PatchClient {
  public static operation: ApiOperationOptions = {
    description: 'Patch Client',
    summary: 'Patch Client',
    deprecated: false,
    tags: ['Client'],
  };

  public static body: ApiBodyOptions = {
    type: () => DefaultClientDto,
    description: 'Patch Client by partial dto',
    isArray: false,
    required: true,
  };

  public static param: ApiParamOptions = {
    name: 'uid',
    description: 'Client uid',
    type: String,
    required: true,
  };

  public static response: ApiResponseOptions = {
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
      ApiSecurity('x-api-key'),
      ApiOperation(this.operation),
      ApiBody(this.body),
      ApiParam(this.param),
      ApiResponse(this.response),
      ApiBadRequestResponse(Exceptions.BadRequest(this.BadRequestSchema)),
      ApiInternalServerErrorResponse(
        Exceptions.InternalServer(this.InternalErrorSchema),
      ),
    );
  }
}

export default PatchClient;
