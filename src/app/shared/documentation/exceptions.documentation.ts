import { ApiResponseOptions } from '@nestjs/swagger';
import { ExceptionsResponseSchemaDto } from './dtos/exception-schema.dto';

class Exceptions {
  public static Conflict(
    schema: ExceptionsResponseSchemaDto,
  ): ApiResponseOptions {
    return { schema: schema, description: 'Conflict', status: 409 };
  }

  public static BadRequest(
    schema: ExceptionsResponseSchemaDto,
  ): ApiResponseOptions {
    return { schema: schema, description: 'Bad Request', status: 400 };
  }

  public static NotFound(
    schema: ExceptionsResponseSchemaDto,
  ): ApiResponseOptions {
    return { schema: schema, description: 'Not Found', status: 404 };
  }

  public static Unauthorized(
    schema: ExceptionsResponseSchemaDto,
  ): ApiResponseOptions {
    return { schema: schema, description: 'Unauthorized', status: 401 };
  }

  public static InternalServer(
    schema: ExceptionsResponseSchemaDto,
  ): ApiResponseOptions {
    return {
      schema: schema,
      description: 'Internal Server Error',
      status: 500,
    };
  }
}
export default Exceptions;
