import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { User } from 'backend/Auth/decorators/User';
import { User as UserEntity } from 'backend/User/entities/User';
import { TelegramBotLoginRequest } from 'backend/Login/TelegramBotLogin/dto/TelegramBotLoginRequest';
import { UserVerifyResponse } from 'backend/Auth/dto/UserVerifyResponse';

@Controller()
@ApiTags('Login')
export class TelegramBotLoginController {
  /**
   * Маршрут для авторизации.
   */
  @Post('/login/telegram-bot')
  @ApiOperation({
    operationId: 'loginTelegramBot',
  })
  @ApiOkResponse({
    type: UserVerifyResponse,
  })
  @UseGuards(AuthGuard('login-telegram-bot'))
  public auth(
    @User() user: UserEntity,
    @Body() _: TelegramBotLoginRequest,
  ): UserVerifyResponse {
    const { hashedPassword, ...response } = user;

    return response;
  }
}
