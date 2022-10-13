import { I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'backend/User/entities/User';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { ConfirmCodeService } from 'backend/ConfirmCode/services/ConfirmCodeService';

@Injectable()
export class EmailVerifyService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly i18nResolver: I18nResolver,
    private readonly configGetter: ConfigGetter,
  ) {}

  /**
   * Отправляет код подтверждения пользователю.
   */
  public async send(user: User): Promise<void> {
    const confirmCode = await this.confirmCodeService.addConfirmCodeToUser(
      user,
    );

    const i18n = await this.i18nResolver.resolve();

    await this.mailerService.sendMail({
      to: user.email,
      subject: i18n.t('welcome', {
        args: {
          domain: this.configGetter.getRootDomain(),
        },
      }),
      text: i18n.t('toConfirm', {
        args: {
          code: confirmCode.value,
        },
      }),
    });
  }
}
