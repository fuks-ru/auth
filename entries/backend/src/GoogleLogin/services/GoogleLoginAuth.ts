import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { SystemErrorFactory, I18nResolver } from '@fuks-ru/common-backend';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { User } from 'backend/User/entities/User';
import { GoogleRegisterService } from 'backend/Register/services/GoogleRegisterService';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class GoogleLoginAuth {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
    private readonly googleRegisterService: GoogleRegisterService,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Авторизуют пользователя по google профилю.
   */
  public async auth(tokenPayload: TokenPayload): Promise<User> {
    const i18n = await this.i18nResolver.resolve();

    if (!tokenPayload.email) {
      throw this.systemErrorFactory.create(
        ErrorCode.GOOGLE_AUTH_EMAIL_NOT_FOUND,
        i18n.t('emailNotFound'),
      );
    }

    return (
      (await this.userService.findConfirmedByEmail(tokenPayload.email)) ||
      (await this.googleRegisterService.register(tokenPayload.email))
    );
  }
}
