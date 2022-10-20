import { SystemErrorFactory, I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';

import { User } from 'backend/User/entities/User';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { TelegramBotLoginRequest } from 'backend/Login/TelegramBotLogin/dto/TelegramBotLoginRequest';
import { internalRequestTokenHeader } from 'backend/constants';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { TelegramBotLoginService } from 'backend/Login/TelegramBotLogin/services/TelegramBotLoginService';

interface IRequest extends ExpressRequest {
  body: TelegramBotLoginRequest;
  headers: {
    [internalRequestTokenHeader]?: string;
  };
}

@Injectable()
export class TelegramBotLoginStrategy extends PassportStrategy(
  Strategy,
  'login-telegram-bot',
) {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
    private readonly configGetter: ConfigGetter,
    private readonly telegramBotLoginService: TelegramBotLoginService,
  ) {
    super();
  }

  /**
   * Валидация по внутреннему токену, telegramId и телефону.
   */
  private async validate(request: IRequest): Promise<User> {
    if (
      request.get(internalRequestTokenHeader) !==
      this.configGetter.getInternalRequestToken()
    ) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.INTERNAL_REQUEST_TOKEN_NOT_VALID,
        i18n.t('internalRequestTokenNotValid'),
      );
    }

    return this.telegramBotLoginService.auth(request.body);
  }
}
