import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Public } from 'backend/Auth/decorators/Public';
import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User as UserEntity } from 'backend/User/entities/User';
import { User } from 'backend/Auth/decorators/User';

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
  public auth(@User() user: UserEntity): void {
    this.loginService.login(user);
  }
}
