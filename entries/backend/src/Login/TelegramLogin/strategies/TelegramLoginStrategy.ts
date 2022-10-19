import { SystemErrorFactory, I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';

import { User } from 'backend/User/entities/User';
import { TelegramLoginService } from 'backend/Login/TelegramLogin/services/TelegramLoginService';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { LinkTelegramService } from 'backend/LinkTelegram/LinkTelegramService';
import { LinkTelegramRequest } from 'backend/LinkTelegram/dto/LinkTelegramRequest';

interface IRequest extends ExpressRequest {
  body: LinkTelegramRequest;
}

@Injectable()
export class TelegramLoginStrategy extends PassportStrategy(
  Strategy,
  'telegram',
) {
  public constructor(
    private readonly linkTelegramService: LinkTelegramService,
    private readonly telegramLoginAuth: TelegramLoginService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();
  }

  /**
   * Валидация по token.
   */
  private async validate({ body: data }: IRequest): Promise<User> {
    const isValid = await this.linkTelegramService.validate(data);

    if (!isValid) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.TELEGRAM_HASH_NOT_VALID,
        i18n.t('telegramHashNotValid'),
      );
    }

    return this.telegramLoginAuth.auth({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
    });
  }
}
