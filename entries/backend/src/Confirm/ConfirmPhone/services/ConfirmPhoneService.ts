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
    private readonly userService: UserService,
    private readonly setJwtCookieService: SetJwtCookieService,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Отправляет код подтверждения пользователю.
   */
  public async send(user: User, phone: string): Promise<void> {
    const userWithThisPhone = await this.userService.findConfirmedByPhone(
      phone,
    );

    if (userWithThisPhone) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.USER_ALREADY_EXISTS,
        i18n.t('userAlreadyExists'),
      );
    }

    const confirmCode = await this.confirmCodeService.addConfirmCodeToUser(
      user,
      phone,
    );

    await this.smsSender.send(`+${phone}`, confirmCode.value);
  }

  /**
   * Подтверждает пользователя, активирует его и осуществляет вход.
   */
  public async confirmUser(
    data: ConfirmPhoneRequest,
    user: User,
  ): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValueAndPhone(
      data.confirmCode,
      data.phone,
      user,
    );

    await this.userService.confirmUser(confirmCode);

    await this.confirmCodeService.removeById(confirmCode.id);

    this.setJwtCookieService.login(user);
  }

  /**
   * Подтверждает телефон пользователя.
   */
  public async confirmPhone(
    data: ConfirmPhoneRequest,
    user: User,
  ): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValueAndPhone(
      data.confirmCode,
      data.phone,
      user,
    );

    await this.userService.changePhone(user, data.phone);

    await this.confirmCodeService.removeById(confirmCode.id);
  }
}
