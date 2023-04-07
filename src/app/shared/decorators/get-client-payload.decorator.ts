import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtStrategyOutputDto } from 'src/infra/modules/authentication/dtos/jwt-strategy-output.dto';

export const GetClientPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtStrategyOutputDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
