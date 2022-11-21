import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from '@core/request';

export const RequestUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    return request.user;
  },
);
