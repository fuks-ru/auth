import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';

import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User as UserEntity } from 'backend/User/entities/User';
import { EmailLoginRequest } from 'backend/Login/EmailLogin/dto/EmailLoginRequest';
import { User } from 'backend/Auth/decorators/User';

@Controller()
@ApiTags('Login')
export class EmailLoginController {
  public constructor(private readonly loginService: SetJwtCookieService) {}

  /**
   * Маршрут для авторизации по логину и паролю.
   */
  @Post('/login/email')
  @ApiOperation({
    operationId: 'loginEmail',
  })
  @UseGuards(
    GoogleRecaptchaGuard,
    AuthGuard('not-auth'),
    AuthGuard('login-email'),
  )
  public login(@User() user: UserEntity, @Body() _: EmailLoginRequest): void {
    this.loginService.login(user);
  }
}
