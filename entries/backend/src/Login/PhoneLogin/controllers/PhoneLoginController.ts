import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';

import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User as UserEntity } from 'backend/User/entities/User';
import { PhoneLoginRequest } from 'backend/Login/PhoneLogin/dto/PhoneLoginRequest';
import { User } from 'backend/Auth/decorators/User';

@Controller()
@ApiTags('Login')
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
  public login(@User() user: UserEntity, @Body() _: PhoneLoginRequest): void {
    this.loginService.login(user);
  }
}
