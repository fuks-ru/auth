import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { Request as ExpressRequest } from 'express';

import { Public } from 'backend/Auth/decorators/Public';
import { LoginService } from 'backend/Login/services/LoginService';
import { User as UserEntity } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: UserEntity;
}

@Controller()
@ApiTags('BasicLogin')
export class BasicLoginController {
  public constructor(private readonly loginService: LoginService) {}

  /**
   * Маршрут для авторизации по логину и паролю.
   */
  @Post('/login/basic')
  @ApiOperation({
    operationId: 'loginBasic',
  })
  @UseGuards(AuthGuard('not-auth'), GoogleRecaptchaGuard, AuthGuard('local'))
  @Public()
  public login(@Request() { user }: IRequest): void {
    this.loginService.login(user);
  }
}
