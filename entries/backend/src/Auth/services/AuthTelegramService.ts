import { Injectable } from '@nestjs/common';
import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';

import { UserService } from 'backend/User/services/UserService';
import { User } from 'backend/User/entities/User';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class AuthTelegramService {
  public constructor(
    private readonly userService: UserService,
    private readonly configGetter: ConfigGetter,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Проверяет токен и возвращает пользователя.
   */
  public async verify(
    id: number | undefined,
    internalToken: string | undefined,
  ): Promise<User | null> {
    if (!id) {
      return null;
    }

    if (internalToken !== this.configGetter.getInternalRequestToken()) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.INTERNAL_REQUEST_TOKEN_NOT_VALID,
        i18n.t('internalRequestTokenNotValid'),
      );
    }

    const user = await this.userService.findConfirmedByTelegramId(id);

    if (!user) {
      return null;
    }

    return user;
  }
}
