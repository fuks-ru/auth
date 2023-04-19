import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from 'backend/User/services/UserService';
import { SendForgotPasswordCodePhoneRequest } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodePhone/dto/SendForgotPasswordCodePhoneRequest';
import { SendForgotPasswordCodePhoneService } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodePhone/SendForgotPasswordCodePhoneService';

@Controller('/send-forgot-password-code/phone')
@ApiTags('ForgotPassword')
export class SendForgotPasswordCodePhoneController {
  public constructor(
    private readonly forgotPasswordService: SendForgotPasswordCodePhoneService,
    private readonly userService: UserService,
  ) {}

  /**
   * Маршрут для отправки кода восстановления.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'sendForgotPasswordCodePhone',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('not-auth'))
  public async sendByPhone(
    @Body() body: SendForgotPasswordCodePhoneRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByPhone(body.phone);

    await this.forgotPasswordService.sendByPhone(user);
  }
}
