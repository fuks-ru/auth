import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';

import { ConfirmEmailRequest } from 'backend/Confirm/ConfirmEmail/dto/ConfirmEmailRequest';
import { ConfirmEmailService } from 'backend/Confirm/ConfirmEmail/services/ConfirmEmailService';
import { SendConfirmEmailRequest } from 'backend/Confirm/ConfirmEmail/dto/SendConfirmEmailRequest';
import { UserService } from 'backend/User/services/UserService';
import { User } from 'backend/Auth/decorators/User';
import { User as UserEntity } from 'backend/User/entities/User';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Controller('/confirm/email')
@ApiTags('Confirm')
export class ConfirmEmailController {
  public constructor(
    private readonly confirmEmailService: ConfirmEmailService,
    private readonly userService: UserService,
    private readonly i18nResolver: I18nResolver,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Отправка кода подтверждения по email для зарегистрированного пользователя.
   */
  @Post('/send-for-registered')
  @ApiOperation({
    operationId: 'sendEmailConfirmCodeForRegistered',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('auth-jwt'))
  public async sendToRegistered(
    @Body() body: SendConfirmEmailRequest,
    @User() user: UserEntity,
  ): Promise<void> {
    await this.confirmEmailService.send(user, body.email);
  }

  /**
   * Отправка кода подтверждения по email.
   */
  @Post('/send-for-unregistered')
  @ApiOperation({
    operationId: 'sendEmailConfirmCodeForUnregistered',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('not-auth'))
  public async sendToUnregistered(
    @Body() body: SendConfirmEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByEmail(body.email);

    if (!user.email) {
      const i18n = this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_PHONE_EMPTY,
        i18n.t('incorrectPhoneFormat'),
      );
    }

    await this.confirmEmailService.send(user, user.email);
  }

  /**
   * Маршрут для подтверждения по email для незарегистрированного пользователя.
   */
  @Post('/confirm-user')
  @ApiOperation({
    operationId: 'confirmUserByEmail',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('not-auth'))
  public async confirmUserByEmail(
    @Body() body: ConfirmEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByEmail(body.email);

    await this.confirmEmailService.confirmUser(body, user);
  }

  /**
   * Маршрут для подтверждения по email для зарегистрированного пользователя.
   */
  @Post('/confirm-email')
  @ApiOperation({
    operationId: 'confirmEmail',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('auth-jwt'))
  public async confirmRegistered(
    @Body() body: ConfirmEmailRequest,
    @User() user: UserEntity,
  ): Promise<void> {
    await this.confirmEmailService.confirmEmail(body, user);
  }
}
