import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: User;
}

@Controller()
@ApiTags('GoogleLogin')
export class GoogleLoginController {
  public constructor(
    private readonly setJwtCookieService: SetJwtCookieService,
  ) {}

  /**
   * Маршрут для авторизации.
   */
  @Post('/login/google')
  @ApiOperation({
    operationId: 'loginGoogle',
  })
  @UseGuards(AuthGuard('not-auth'), AuthGuard('login-google'))
  public auth(@Request() { user }: IRequest): void {
    this.setJwtCookieService.login(user);
  }
}
