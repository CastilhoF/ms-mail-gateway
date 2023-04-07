import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  private readonly configService: ConfigService = new ConfigService();
  private readonly logger = new Logger(AuthorizationMiddleware.name);

  private exceptionHandler(headers: any) {
    this.logger.error(
      `Unauthorized Server Access. API Key: ${headers['x-api-key']}`,
    );
    return new UnauthorizedException(
      `Unauthorized Server Access. API Key: ${headers['x-api-key']}`,
    );
  }

  use(request: Request, response: Response, next: NextFunction) {
    const { headers } = request;
    const key = this.configService.get('APP_API_KEY');
    headers['x-api-key'] === key
      ? next()
      : next(this.exceptionHandler(headers));
  }
}
