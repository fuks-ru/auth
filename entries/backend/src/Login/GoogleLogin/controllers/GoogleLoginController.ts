import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';

import { Public } from 'backend/Auth/decorators/Public';
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
  @Public()
  @UseGuards(AuthGuard('not-auth'), AuthGuard('google'))
  public auth(@Request() { user }: IRequest): void {
    this.setJwtCookieService.login(user);
  }
}
