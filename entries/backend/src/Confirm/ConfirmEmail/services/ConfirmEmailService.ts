import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'backend/User/entities/User';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { ConfirmCodeService } from 'backend/ConfirmCode/services/ConfirmCodeService';
import { ConfirmEmailRequest } from 'backend/Confirm/ConfirmEmail/dto/ConfirmEmailRequest';
import { UserService } from 'backend/User/services/UserService';
import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class ConfirmEmailService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly i18nResolver: I18nResolver,
    private readonly configGetter: ConfigGetter,
    private readonly userService: UserService,
    private readonly setJwtCookieService: SetJwtCookieService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Отправляет код подтверждения пользователю.
   */
  public async send(user: User, email: string): Promise<void> {
    const userWithThisEmail = await this.userService.findConfirmedByEmail(
      email,
    );

    if (userWithThisEmail) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.USER_ALREADY_EXISTS,
        i18n.t('userAlreadyExists'),
      );
    }

    const confirmCode = await this.confirmCodeService.addConfirmCodeToUser(
      user,
      email,
    );

    const i18n = await this.i18nResolver.resolve();

    await this.mailerService.sendMail({
      to: email,
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
   * Подтверждает email пользователя, активирует его и осуществляет вход.
   */
  public async confirmUser(
    data: ConfirmEmailRequest,
    user: User,
  ): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValueAndEmail(
      data.confirmCode,
      data.email,
      user,
    );

    await this.userService.confirmEmailByConfirmCode(confirmCode, data.email);

    await this.confirmCodeService.removeById(confirmCode.id);

    this.setJwtCookieService.login(user);
  }

  /**
   * Подтверждает email пользователя.
   */
  public async confirmEmail(
    data: ConfirmEmailRequest,
    user: User,
  ): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValueAndEmail(
      data.confirmCode,
      data.email,
      user,
    );

    await this.userService.changeEmail(user, data.email);

    await this.confirmCodeService.removeById(confirmCode.id);
  }
}
