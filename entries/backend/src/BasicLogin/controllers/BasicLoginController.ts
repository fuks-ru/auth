import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { Request as ExpressRequest } from 'express';

import { Public } from 'backend/Auth/decorators/Public';
import { BasicLoginRequest } from 'backend/BasicLogin/dto/BasicLoginRequest';
import { LoginService } from 'backend/Login/services/LoginService';
import { User as UserEntity } from 'backend/User/entities/User';

interface IRequest extends ExpressRequest {
  user: UserEntity;
  body: BasicLoginRequest;
}

@Controller()
@ApiTags('BasicAuth')
export class BasicLoginController {
  public constructor(private readonly loginService: LoginService) {}

  /**
   * Маршрут для авторизации по логину и паролю.
   */
  @Post('/login/basic')
  @ApiOperation({
    operationId: 'loginBasic',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('local'))
  @Public()
  public login(
    @Request() { user, body }: IRequest,
    @Body() _: BasicLoginRequest,
  ): void {
    this.loginService.login(user, body.redirectFrom);
  }
}
