import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { Public } from 'backend/Auth/decorators/Public';
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
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async sendByEmail(
    @Body() body: SendForgotPasswordCodeEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getConfirmedByEmail(body.email);

    await this.forgotPasswordService.sendByEmail(user);
  }
}
