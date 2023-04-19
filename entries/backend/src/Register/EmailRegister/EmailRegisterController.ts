import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { EmailRegisterRequest } from 'backend/Register/EmailRegister/dto/EmailRegisterRequest';
import { EmailRegisterService } from 'backend/Register/EmailRegister/EmailRegisterService';

@Controller('/register/email')
@ApiTags('EmailRegister')
export class EmailRegisterController {
  public constructor(
    private readonly emailRegisterService: EmailRegisterService,
  ) {}

  /**
   * Маршрут для регистрации по email и паролю.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'registerEmail',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('not-auth'))
  public async email(@Body() body: EmailRegisterRequest): Promise<void> {
    await this.emailRegisterService.register(body);
  }
}
