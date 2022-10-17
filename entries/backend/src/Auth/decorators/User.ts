import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { User as UserEntity } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: UserEntity;
}

/**
 * Получает пользователя из request'а.
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequest>();

    return request.user;
  },
);
