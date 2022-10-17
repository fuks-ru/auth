import { I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'backend/User/entities/User';
import { ForgotPasswordCodeService } from 'backend/ForgotPasswordCode/services/ForgotPasswordCodeService';

@Injectable()
export class SendForgotPasswordCodeEmailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
    private readonly i18nResolver: I18nResolver,
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
}
