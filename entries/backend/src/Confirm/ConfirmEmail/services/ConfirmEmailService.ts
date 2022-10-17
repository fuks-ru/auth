import { I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'backend/User/entities/User';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { ConfirmCodeService } from 'backend/ConfirmCode/services/ConfirmCodeService';
import { ConfirmEmailRequest } from 'backend/Confirm/ConfirmEmail/dto/ConfirmEmailRequest';
import { UserService } from 'backend/User/services/UserService';
import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';

@Injectable()
export class ConfirmEmailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly i18nResolver: I18nResolver,
    private readonly configGetter: ConfigGetter,
    private readonly userService: UserService,
    private readonly setJwtCookieService: SetJwtCookieService,
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

  /**
   * Подтверждает email пользователя, активирует его.
   */
  public async confirm(data: ConfirmEmailRequest): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValueAndEmail(
      data.confirmCode,
      data.email,
    );

    const user = await this.userService.confirmEmailByConfirmCode(
      confirmCode,
      data.email,
    );

    await this.confirmCodeService.removeById(confirmCode.id);

    this.setJwtCookieService.login(user);
  }
}
