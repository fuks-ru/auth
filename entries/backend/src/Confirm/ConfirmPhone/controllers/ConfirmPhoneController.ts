import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { Public } from 'backend/Auth/decorators/Public';
import { ConfirmPhoneRequest } from 'backend/Confirm/ConfirmPhone/dto/ConfirmPhoneRequest';
import { ConfirmPhoneService } from 'backend/Confirm/ConfirmPhone/services/ConfirmPhoneService';
import { ResendConfirmEmailRequest } from 'backend/Confirm/ConfirmEmail/dto/ResendConfirmEmailRequest';
import { UserService } from 'backend/User/services/UserService';

@Controller('/confirm/phone')
@ApiTags('Confirm')
export class ConfirmPhoneController {
  public constructor(
    private readonly confirmPhoneService: ConfirmPhoneService,
    private readonly userService: UserService,
  ) {}

  /**
   * Маршрут для подтверждения по телефону.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'confirmPhone',
  })
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async confirm(@Body() body: ConfirmPhoneRequest): Promise<void> {
    await this.confirmPhoneService.confirm(body);
  }

  /**
   * Повторная отправка кода подтверждения по email.
   */
  @Post('/resend')
  @ApiOperation({
    operationId: 'confirmPhoneResend',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async resendByEmail(
    @Body() body: ResendConfirmEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByEmail(body.email);

    await this.confirmPhoneService.send(user);
  }
}
