import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { Public } from 'backend/Auth/decorators/Public';
import { ConfirmEmailRequest } from 'backend/Confirm/ConfirmEmail/dto/ConfirmEmailRequest';
import { ConfirmEmailService } from 'backend/Confirm/ConfirmEmail/services/ConfirmEmailService';
import { ResendConfirmEmailRequest } from 'backend/Confirm/ConfirmEmail/dto/ResendConfirmEmailRequest';
import { UserService } from 'backend/User/services/UserService';

@Controller('/confirm/email')
@ApiTags('Confirm')
export class ConfirmEmailController {
  public constructor(
    private readonly confirmEmailService: ConfirmEmailService,
    private readonly userService: UserService,
  ) {}

  /**
   * Маршрут для подтверждения email.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'confirmEmail',
  })
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async confirm(@Body() body: ConfirmEmailRequest): Promise<void> {
    await this.confirmEmailService.confirm(body);
  }

  /**
   * Повторная отправка кода подтверждения по email.
   */
  @Post('/resend')
  @ApiOperation({
    operationId: 'confirmEmailResend',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async resendByEmail(
    @Body() body: ResendConfirmEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByEmail(body.email);

    await this.confirmEmailService.send(user);
  }
}
