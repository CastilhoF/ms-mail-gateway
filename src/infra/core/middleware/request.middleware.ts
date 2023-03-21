import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(RequestMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    this.logger.debug(
      'Request: %O',
      this.requestFormat(request),
      RequestMiddleware.name,
    );

    next();
  }

  requestFormat(request: Request) {
    return {
      route: `${request.method} - ${request.originalUrl}`,
      body: request.body,
      headers: request.headers,
      params: request.params,
      query: request.query,
    };
  }
}
