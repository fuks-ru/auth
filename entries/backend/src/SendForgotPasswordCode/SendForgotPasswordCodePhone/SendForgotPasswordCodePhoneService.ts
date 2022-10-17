import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { User } from 'backend/User/entities/User';
import { SmsSenderService } from 'backend/SmsSender/services/SmsSenderService';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { ForgotPasswordCodeService } from 'backend/ForgotPasswordCode/services/ForgotPasswordCodeService';

@Injectable()
export class SendForgotPasswordCodePhoneService {
  public constructor(
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
    private readonly i18nResolver: I18nResolver,
    private readonly smsSenderService: SmsSenderService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Отправляет код восстановления пароля пользователю по телефону.
   */
  public async sendByPhone(user: User): Promise<void> {
    if (!user.phone) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_PHONE_EMPTY,
        i18n.t('incorrectPhoneFormat'),
      );
    }

    const forgotPasswordCode =
      await this.forgotPasswordCodeService.addForgotPasswordCodeToUser(user);

    await this.smsSenderService.send(
      `+${user.phone}`,
      forgotPasswordCode.value,
    );
  }
}
