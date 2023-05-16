import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOperationOptions,
  ApiProperty,
  ApiResponse,
  ApiResponseOptions,
  ApiTags,
} from '@nestjs/swagger';

class HealthCheckResponse {
  @ApiProperty({
    name: 'message',
    description: 'Health check message',
    example: 'OK',
  })
  message: string;
}

class HealthCheck {
  public static operation: ApiOperationOptions = {
    summary: 'Health check',
    description: 'Health check',
    deprecated: false,
    tags: ['Health Check'],
  };

  public static response: ApiResponseOptions = {
    description: 'Health check',
    type: () => HealthCheckResponse,
    status: 200,
  };

  public static Doc(): MethodDecorator {
    return applyDecorators(
      ApiTags('Health Check'),
      ApiOperation(this.operation),
      ApiResponse(this.response),
    );
  }
}

export default HealthCheck;
