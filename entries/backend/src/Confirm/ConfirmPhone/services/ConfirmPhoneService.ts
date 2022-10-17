import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { User } from 'backend/User/entities/User';
import { ConfirmCodeService } from 'backend/ConfirmCode/services/ConfirmCodeService';
import { SmsSenderService } from 'backend/SmsSender/services/SmsSenderService';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { ConfirmPhoneRequest } from 'backend/Confirm/ConfirmPhone/dto/ConfirmPhoneRequest';
import { UserService } from 'backend/User/services/UserService';
import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';

@Injectable()
export class ConfirmPhoneService {
  public constructor(
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly smsSender: SmsSenderService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
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

    if (!user.phone) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_PHONE_EMPTY,
        i18n.t('incorrectPhoneFormat'),
      );
    }

    await this.smsSender.send(`+${user.phone}`, confirmCode.value);
  }

  /**
   * Подтверждает телефон пользователя, активирует его и осуществляет вход.
   */
  public async confirm(data: ConfirmPhoneRequest): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValueAndPhone(
      data.confirmCode,
      data.phone,
    );

    const user = await this.userService.confirmPhoneByConfirmCode(
      confirmCode,
      data.phone,
    );

    await this.confirmCodeService.removeById(confirmCode.id);

    this.setJwtCookieService.login(user);
  }
}
