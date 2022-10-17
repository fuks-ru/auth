import { Injectable } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import {
  SystemErrorFactory,
  I18nResolver,
  EncodingService,
} from '@fuks-ru/common-backend';
import { v4 } from 'uuid';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class GoogleLoginService {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
    private readonly i18nResolver: I18nResolver,
    private readonly encodingService: EncodingService,
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
      (await this.register(tokenPayload.email))
    );
  }

  /**
   * Регистрирует пользователя.
   */
  private async register(email: string): Promise<User> {
    const hashedPassword = await this.encodingService.hash(v4());

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.email = email;
    user.role = Role.USER;
    user.isConfirmed = true;

    return this.userService.addUserIfNotConfirmed(user);
  }
}
