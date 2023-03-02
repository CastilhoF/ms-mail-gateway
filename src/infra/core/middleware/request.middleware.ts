import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(RequestMiddleware.name);

  use(request: Request, response: Response, next: () => void) {
    this.logger.debug(
      'Request: %O',
      this.requestFormat(request),
      RequestMiddleware.name,
    );

    next();
  }

  requestFormat(request: Request) {
    return {
      route: `${request.method} - ${request.url}`,
      body: request.body,
      headers: request.headers,
      cache: request.cache,
      mode: request.mode,
      credentials: request.credentials,
      destination: request.destination,
    };
  }
}
