import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { Public } from 'backend/Auth/decorators/Public';
import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: User;
}

@Controller()
@ApiTags('TelegramLogin')
export class TelegramLoginController {
  public constructor(private readonly loginService: SetJwtCookieService) {}

  /**
   * Маршрут для авторизации.
   */
  @Post('/login/telegram')
  @ApiOperation({
    operationId: 'loginTelegram',
  })
  @Public()
  @UseGuards(AuthGuard('not-auth'), AuthGuard('telegram'))
  public auth(@Request() { user }: IRequest): void {
    this.loginService.login(user);
  }
}
