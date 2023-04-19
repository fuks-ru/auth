import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from 'backend/User/services/UserService';
import { SendForgotPasswordCodeEmailService } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodeEmail/SendForgotPasswordCodeEmailService';
import { SendForgotPasswordCodeEmailRequest } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodeEmail/dto/SendForgotPasswordCodeEmailRequest';

@Controller('/send-forgot-password-code/email')
@ApiTags('ForgotPassword')
export class SendForgotPasswordCodeEmailController {
  public constructor(
    private readonly forgotPasswordService: SendForgotPasswordCodeEmailService,
    private readonly userService: UserService,
  ) {}

  /**
   * Маршрут для отправки кода восстановления по email.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'sendForgotPasswordCodeEmail',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('not-auth'))
  public async sendByEmail(
    @Body() body: SendForgotPasswordCodeEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getConfirmedByEmail(body.email);

    await this.forgotPasswordService.sendByEmail(user);
  }
}
