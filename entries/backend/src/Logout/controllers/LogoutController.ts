import { CookieSetterService } from '@fuks-ru/common-backend';
import { Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { JWT_TOKEN_COOKIE_NAME } from 'backend/SetJwtCookie/utils/constants';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

@Controller('logout')
export class LogoutController {
  public constructor(
    private readonly cookieSetterService: CookieSetterService,
    private readonly configGetter: ConfigGetter,
  ) {}

  /**
   * Выход из системы.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'logout',
  })
  public logout(): void {
    this.cookieSetterService.clearCookie(JWT_TOKEN_COOKIE_NAME, {
      domain: this.configGetter.getCookieDomain(),
    });
  }
}
