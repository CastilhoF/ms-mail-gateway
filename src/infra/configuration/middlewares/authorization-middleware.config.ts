import { RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

export class AuthMiddleware {
  public static configuration: (string | RouteInfo)[] = [
    {
      path: '*',
      method: RequestMethod.ALL,
    },
  ];
}
