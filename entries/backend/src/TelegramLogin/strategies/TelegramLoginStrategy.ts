import {
  SystemErrorFactory,
  ValidationErrorFactory,
  I18nResolver,
} from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';
import { createHash, createHmac } from 'node:crypto';
import * as Buffer from 'node:buffer';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { User } from 'backend/User/entities/User';
import { TelegramLoginAuth } from 'backend/TelegramLogin/services/TelegramLoginAuth';
import { TelegramLoginRequest } from 'backend/TelegramLogin/dto/TelegramLoginRequest';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

interface IRequest extends ExpressRequest {
  body: TelegramLoginRequest;
}

@Injectable()
export class TelegramLoginStrategy extends PassportStrategy(
  Strategy,
  'telegram',
) {
  private readonly secret: Buffer;

  public constructor(
    private readonly telegramLoginAuth: TelegramLoginAuth,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly configGetter: ConfigGetter,
    private readonly validationErrorFactory: ValidationErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();

    this.secret = createHash('sha256')
      .update(configGetter.getTelegramBotToken())
      .digest();
  }

  /**
   * Валидация по token.
   */
  private async validate({ body: { hash, ...data } }: IRequest): Promise<User> {
    const i18n = await this.i18nResolver.resolve();

    if (!hash) {
      throw await this.validationErrorFactory.createFromData({
        accessToken: [i18n.t('emptyToken')],
      });
    }

    const hmac = createHmac('sha256', this.secret);

    const checkString = Object.keys(data)
      .sort()
      .map((k) => `${k}=${data[k as keyof typeof data] as string}`)
      .join('\n');

    const checkedHmac = hmac.update(checkString).digest('hex');

    if (checkedHmac !== hash) {
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
