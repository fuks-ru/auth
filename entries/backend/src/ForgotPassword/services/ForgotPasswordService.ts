import { I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import qs from 'qs';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'backend/User/entities/User';
import { ForgotPasswordCodeService } from 'backend/ForgotPassword/services/ForgotPasswordCodeService';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

@Injectable()
export class ForgotPasswordService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
    private readonly i18nResolver: I18nResolver,
    private readonly configGetter: ConfigGetter,
  ) {}

  /**
   * Отправляет код восстановления пароля пользователю.
   */
  public async send(user: User, redirectFrom?: string): Promise<void> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeService.addForgotPasswordCodeToUser(user);

    const changePasswordUrl = `${this.configGetter.getAuthDomainWithScheme()}/change-password?${qs.stringify(
      {
        forgotPasswordCode: forgotPasswordCode.value,
        redirectFrom,
      },
    )}`;

    const i18n = await this.i18nResolver.resolve();

    await this.mailerService.sendMail({
      to: user.email,
      subject: i18n.t('passwordRecovery'),
      text: i18n.t('toChangePassword', {
        args: {
          link: changePasswordUrl,
        },
      }),
    });
  }
}
