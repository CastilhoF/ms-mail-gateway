import { RequestMethod } from '@nestjs/common';
import { RouteInfo } from '@nestjs/common/interfaces';

export class ReqMiddleware {
  public static forRoutes: (string | RouteInfo)[] = [
    {
      path: '*',
      method: RequestMethod.ALL,
    },
  ];

  public static exclude: (string | RouteInfo)[] = [
    {
      path: '(.*)/health-check',
      method: RequestMethod.GET,
    },
  ];
}
