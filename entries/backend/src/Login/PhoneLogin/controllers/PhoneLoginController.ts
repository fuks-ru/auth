import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { Request as ExpressRequest } from 'express';

import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User as UserEntity } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: UserEntity;
}

@Controller()
@ApiTags('PhoneLogin')
export class PhoneLoginController {
  public constructor(private readonly loginService: SetJwtCookieService) {}

  /**
   * Маршрут для авторизации по телефону и паролю.
   */
  @Post('/login/phone')
  @ApiOperation({
    operationId: 'loginPhone',
  })
  @UseGuards(
    GoogleRecaptchaGuard,
    AuthGuard('not-auth'),
    AuthGuard('login-phone'),
  )
  public login(@Request() { user }: IRequest): void {
    this.loginService.login(user);
  }
}
