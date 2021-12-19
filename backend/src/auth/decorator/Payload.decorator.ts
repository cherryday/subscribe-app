import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtRequest } from '../interface/jwt-request.interface';

export const Payload = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<JwtRequest>();
    return request.user;
  },
);
