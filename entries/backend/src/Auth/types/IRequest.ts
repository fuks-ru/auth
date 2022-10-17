import { Request as ExpressRequest } from 'express';

import { JWT_TOKEN_COOKIE_NAME } from 'backend/SetJwtCookie/utils/constants';

/**
 * Описывает входящий запрос с кукой для авторизации.
 */
export interface IRequest extends ExpressRequest {
  /**
   * Куки.
   */
  cookies: {
    [JWT_TOKEN_COOKIE_NAME]?: string;
  };
}
