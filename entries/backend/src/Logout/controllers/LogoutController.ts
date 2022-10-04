import { CookieSetterService } from '@fuks-ru/common-backend';
import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { JWT_TOKEN_COOKIE_NAME } from 'backend/Login/utils/constants';

@Controller('logout')
export class LogoutController {
  public constructor(
    private readonly cookieSetterService: CookieSetterService,
  ) {}

  /**
   * Выход из системы.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'logout',
  })
  public logout(): void {
    this.cookieSetterService.clearCookie(JWT_TOKEN_COOKIE_NAME);
  }
}
