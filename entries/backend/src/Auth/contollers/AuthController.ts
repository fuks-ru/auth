import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserVerifyResponse } from 'backend/Auth/dto/UserVerifyResponse';
import { Public } from 'backend/Auth/decorators/Public';
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
  public verify(@User() user: UserEntity): UserVerifyResponse {
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
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public checkNot(): void {}
}
