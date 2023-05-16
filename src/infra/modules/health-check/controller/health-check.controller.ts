import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import HealthCheck from '../documentation/health-check.documentation';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller({ path: 'health-check', version: '1' })
@UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
export class HealthCheckController {
  @Get()
  @HttpCode(HttpStatus.OK)
  @HealthCheck.Doc()
  async healthCheck() {
    return {
      message: 'OK',
    };
  }
}
