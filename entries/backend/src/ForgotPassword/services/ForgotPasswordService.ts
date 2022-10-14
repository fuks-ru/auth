import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'backend/User/entities/User';
import { ForgotPasswordCodeService } from 'backend/ForgotPassword/services/ForgotPasswordCodeService';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { SmsSenderService } from 'backend/SmsSender/services/SmsSenderService';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class ForgotPasswordService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
    private readonly i18nResolver: I18nResolver,
    private readonly configGetter: ConfigGetter,
    private readonly smsSenderService: SmsSenderService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Отправляет код восстановления пароля пользователю по email.
   */
  public async sendByEmail(user: User): Promise<void> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeService.addForgotPasswordCodeToUser(user);

    const i18n = await this.i18nResolver.resolve();

    await this.mailerService.sendMail({
      to: user.email,
      subject: i18n.t('passwordRecovery'),
      text: i18n.t('toChangePassword', {
        args: {
          code: forgotPasswordCode.value,
        },
      }),
    });
  }

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
