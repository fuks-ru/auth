import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { Public } from 'backend/Auth/decorators/Public';
import { ForgotPasswordService } from 'backend/ForgotPassword/services/ForgotPasswordService';
import { ChangePasswordService } from 'backend/ForgotPassword/services/ChangePasswordService';
import { ForgotPasswordEmailRequest } from 'backend/ForgotPassword/dto/ForgotPasswordEmailRequest';
import { UserService } from 'backend/User/services/UserService';
import { ChangePasswordEmailRequest } from 'backend/ForgotPassword/dto/ChangePasswordEmailRequest';
import { ForgotPasswordPhoneRequest } from 'backend/ForgotPassword/dto/ForgotPasswordPhoneRequest';
import { ChangePasswordPhoneRequest } from 'backend/ForgotPassword/dto/ChangePasswordPhoneRequest';

@Controller('/forgot-password')
@ApiTags('ForgotPassword')
export class ForgotPasswordController {
  public constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly changePasswordService: ChangePasswordService,
    private readonly userService: UserService,
  ) {}

  /**
   * Маршрут для отправки кода восстановления по email.
   */
  @Post('/send/email')
  @ApiOperation({
    operationId: 'forgotPasswordSendEmail',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async sendByEmail(
    @Body() body: ForgotPasswordEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getConfirmedByEmail(body.email);

    await this.forgotPasswordService.sendByEmail(user);
  }

  /**
   * Маршрут для отправки кода восстановления.
   */
  @Post('/send/phone')
  @ApiOperation({
    operationId: 'forgotPasswordSendPhone',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async sendByPhone(
    @Body() body: ForgotPasswordPhoneRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByPhone(body.phone);

    await this.forgotPasswordService.sendByPhone(user);
  }

  /**
   * Маршрут для смены пароля по email.
   */
  @Post('/change/email')
  @ApiOperation({
    operationId: 'changePasswordEmail',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async changeByEmail(
    @Body() body: ChangePasswordEmailRequest,
  ): Promise<void> {
    await this.changePasswordService.changeByEmail(body);
  }

  /**
   * Маршрут для смены пароля по телефону.
   */
  @Post('/change/phone')
  @ApiOperation({
    operationId: 'changePasswordPhone',
  })
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async changePhone(
    @Body() body: ChangePasswordPhoneRequest,
  ): Promise<void> {
    await this.changePasswordService.changeByPhone(body);
  }
}
