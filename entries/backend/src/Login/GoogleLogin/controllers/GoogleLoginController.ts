import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { User as UserEntity } from 'backend/User/entities/User';
import { User } from 'backend/Auth/decorators/User';
import { GoogleLoginRequest } from 'backend/Login/GoogleLogin/dto/GoogleLoginRequest';

@Controller()
@ApiTags('Login')
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
  public auth(@User() user: UserEntity, @Body() _: GoogleLoginRequest): void {
    this.setJwtCookieService.login(user);
  }
}
