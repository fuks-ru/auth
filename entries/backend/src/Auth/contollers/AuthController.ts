import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UserVerifyResponse } from 'backend/Auth/dto/UserVerifyResponse';
import { Public } from 'backend/Auth/decorators/Public';
import { User } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: User;
}

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
  public verify(@Req() request: IRequest): UserVerifyResponse {
    const { hashedPassword, ...response } = request.user;

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
