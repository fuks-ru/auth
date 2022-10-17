import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { Request as ExpressRequest } from 'express';

import { Public } from 'backend/Auth/decorators/Public';
import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User as UserEntity } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: UserEntity;
}

@Controller()
@ApiTags('EmailLogin')
export class EmailLoginController {
  public constructor(private readonly loginService: SetJwtCookieService) {}

  /**
   * Маршрут для авторизации по логину и паролю.
   */
  @Post('/login/email')
  @ApiOperation({
    operationId: 'loginEmail',
  })
  @UseGuards(AuthGuard('not-auth'), GoogleRecaptchaGuard, AuthGuard('email'))
  @Public()
  public login(@Request() { user }: IRequest): void {
    this.loginService.login(user);
  }
}
