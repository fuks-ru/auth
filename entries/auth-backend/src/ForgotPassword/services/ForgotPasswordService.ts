import { I18nResolver } from '@fuks-ru/common-backend';
import { urls, domainUrlWithScheme } from '@fuks-ru/auth-constants';
import { Injectable } from '@nestjs/common';
import qs from 'qs';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'auth-backend/User/entities/User';
import { ForgotPasswordCodeService } from 'auth-backend/ForgotPassword/services/ForgotPasswordCodeService';

@Injectable()
export class ForgotPasswordService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Отправляет код восстановления пароля пользователю.
   */
  public async send(
    user: User,
    redirectFrom: string = domainUrlWithScheme,
  ): Promise<void> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeService.addForgotPasswordCodeToUser(
        user,
        redirectFrom,
      );

    const changePasswordUrl = `${
      urls.AUTH_FRONTEND_URL
    }/change-password?${qs.stringify({
      forgotPasswordCode: forgotPasswordCode.value,
    })}`;

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
