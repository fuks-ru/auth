import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard, AuthGuard as BaseAuthGuard } from '@nestjs/passport';

import { UserVerifyResponse } from 'backend/Auth/dto/UserVerifyResponse';
import { User as UserEntity } from 'backend/User/entities/User';
import { User } from 'backend/Auth/decorators/User';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  /**
   * Маршрут для получения пользователя по токену.
   */
  @Get('/verify')
  @ApiOperation({
    operationId: 'authVerify',
  })
  @ApiOkResponse({
    type: UserVerifyResponse,
  })
  @UseGuards(AuthGuard('auth-jwt'))
  public verifyJwt(@User() user: UserEntity): UserVerifyResponse {
    const { hashedPassword, ...response } = user;

    return response;
  }

  /**
   * Маршрут для получения пользователя по телеграм id.
   */
  @Get('/verify/telegram')
  @ApiOperation({
    operationId: 'authVerifyTelegram',
  })
  @ApiOkResponse({
    type: UserVerifyResponse,
  })
  @UseGuards(AuthGuard('auth-telegram'))
  // eslint-disable-next-line sonarjs/no-identical-functions
  public verifyTelegram(@User() user: UserEntity): UserVerifyResponse {
    const { hashedPassword, ...response } = user;

    return response;
  }

  /**
   * Маршрут, возвращающий успешный ответ, если пользователь не авторизован.
   */
  @Get('/check-not')
  @ApiOperation({
    operationId: 'authCheckNot',
  })
  @UseGuards(BaseAuthGuard('not-auth'))
  public checkNot(): void {}
}
