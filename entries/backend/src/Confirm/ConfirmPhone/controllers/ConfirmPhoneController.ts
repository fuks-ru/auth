import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';

import { User as UserEntity } from 'backend/User/entities/User';
import { ConfirmPhoneRequest } from 'backend/Confirm/ConfirmPhone/dto/ConfirmPhoneRequest';
import { ConfirmPhoneService } from 'backend/Confirm/ConfirmPhone/services/ConfirmPhoneService';
import { UserService } from 'backend/User/services/UserService';
import { SendConfirmPhoneRequest } from 'backend/Confirm/ConfirmPhone/dto/SendConfirmPhoneRequest';
import { User } from 'backend/Auth/decorators/User';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Controller('/confirm/phone')
@ApiTags('Confirm')
export class ConfirmPhoneController {
  public constructor(
    private readonly confirmPhoneService: ConfirmPhoneService,
    private readonly userService: UserService,
    private readonly i18nResolver: I18nResolver,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Отправка кода подтверждения по телефону для зарегистрированного
   * пользователя.
   */
  @Post('/send-for-registered')
  @ApiOperation({
    operationId: 'sendPhoneConfirmCodeForRegistered',
  })
  @Recaptcha()
  @UseGuards(AuthGuard('auth-jwt'))
  public async sendToRegistered(
    @Body() body: SendConfirmPhoneRequest,
    @User() user: UserEntity,
  ): Promise<void> {
    await this.confirmPhoneService.send(user, body.phone);
  }

  /**
   * Отправка кода подтверждения по телефону.
   */
  @Post('/send-for-unregistered')
  @ApiOperation({
    operationId: 'sendPhoneConfirmCodeForUnregistered',
  })
  @Recaptcha()
  @UseGuards(AuthGuard('not-auth'))
  public async sendToUnregistered(
    @Body() body: SendConfirmPhoneRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByPhone(body.phone);

    if (!user.phone) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_PHONE_EMPTY,
        i18n.t('incorrectPhoneFormat'),
      );
    }

    await this.confirmPhoneService.send(user, user.phone);
  }

  /**
   * Маршрут для подтверждения по телефону для незарегистрированного
   * пользователя.
   */
  @Post('/confirm-user')
  @ApiOperation({
    operationId: 'confirmUserByPhone',
  })
  @UseGuards(AuthGuard('not-auth'))
  public async confirmUserByPhone(
    @Body() body: ConfirmPhoneRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByPhone(body.phone);

    await this.confirmPhoneService.confirmUser(body, user);
  }

  /**
   * Маршрут для подтверждения по телефону для зарегистрированного пользователя.
   */
  @Post('/confirm-phone')
  @ApiOperation({
    operationId: 'confirmPhone',
  })
  @UseGuards(AuthGuard('auth-jwt'))
  public async confirmRegistered(
    @Body() body: ConfirmPhoneRequest,
    @User() user: UserEntity,
  ): Promise<void> {
    await this.confirmPhoneService.confirmPhone(body, user);
  }
}
