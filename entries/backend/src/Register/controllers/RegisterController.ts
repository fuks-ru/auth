import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { Public } from 'backend/Auth/decorators/Public';
import { EmailVerifyService } from 'backend/Register/modules/EmailVerify/services/EmailVerifyService';
import { EmailRegisterRequest } from 'backend/Register/dto/EmailRegisterRequest';
import { ResendConfirmEmailRequest } from 'backend/Register/dto/ResendConfirmEmailRequest';
import { EmailRegisterService } from 'backend/Register/services/EmailRegisterService';
import { UserService } from 'backend/User/services/UserService';
import { PhoneRegisterService } from 'backend/Register/services/PhoneRegisterService';
import { PhoneRegisterRequest } from 'backend/Register/dto/PhoneRegisterRequest';
import { PhoneVerifyService } from 'backend/Register/modules/PhoneVerify/services/PhoneVerifyService';
import { ResendConfirmPhoneRequest } from 'backend/Register/dto/ResendConfirmPhoneRequest';

@Controller('/register')
@ApiTags('EmailRegister')
export class RegisterController {
  public constructor(
    private readonly emailRegisterService: EmailRegisterService,
    private readonly phoneRegisterService: PhoneRegisterService,
    private readonly userService: UserService,
    private readonly emailVerifyService: EmailVerifyService,
    private readonly phoneVerifyService: PhoneVerifyService,
  ) {}

  /**
   * Маршрут для регистрации по email и паролю.
   */
  @Post('/email')
  @ApiOperation({
    operationId: 'registerEmail',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async email(@Body() body: EmailRegisterRequest): Promise<void> {
    await this.emailRegisterService.register(body);
  }

  /**
   * Маршрут для регистрации по телефону и паролю.
   */
  @Post('/phone')
  @ApiOperation({
    operationId: 'registerPhone',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async phone(@Body() body: PhoneRegisterRequest): Promise<void> {
    await this.phoneRegisterService.register(body);
  }

  /**
   * Повторная отправка кода подтверждения по email.
   */
  @Post('/email-resend-confirm')
  @ApiOperation({
    operationId: 'emailResendConfirm',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async resendByEmail(
    @Body() body: ResendConfirmEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByEmail(body.email);

    await this.emailVerifyService.send(user);
  }

  /**
   * Повторная отправка кода подтверждения по телефону.
   */
  @Post('/phone-resend-confirm')
  @ApiOperation({
    operationId: 'phoneResendConfirm',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async resendByPhone(
    @Body() body: ResendConfirmPhoneRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByPhone(body.phone);

    await this.phoneVerifyService.send(user);
  }
}
