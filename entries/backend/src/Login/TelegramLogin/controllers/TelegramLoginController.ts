import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User as UserEntity } from 'backend/User/entities/User';
import { User } from 'backend/Auth/decorators/User';
import { LinkTelegramRequest } from 'backend/LinkTelegram/dto/LinkTelegramRequest';

@Controller()
@ApiTags('Login')
export class TelegramLoginController {
  public constructor(private readonly loginService: SetJwtCookieService) {}

  /**
   * Маршрут для авторизации.
   */
  @Post('/login/telegram')
  @ApiOperation({
    operationId: 'loginTelegram',
  })
  @UseGuards(AuthGuard('not-auth'), AuthGuard('login-telegram'))
  public auth(@User() user: UserEntity, @Body() _: LinkTelegramRequest): void {
    this.loginService.login(user);
  }
}
