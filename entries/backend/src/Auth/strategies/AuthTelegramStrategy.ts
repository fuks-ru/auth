import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request as ExpressRequest } from 'express';

import { User } from 'backend/User/entities/User';
import { AuthTelegramService } from 'backend/Auth/services/AuthTelegramService';
import { internalRequestTokenHeader } from 'backend/constants';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

interface IRequest extends ExpressRequest {
  body: {
    id?: number;
  };
}

@Injectable()
export class AuthTelegramStrategy extends PassportStrategy(
  Strategy,
  'auth-telegram',
) {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly telegramAuthService: AuthTelegramService,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();
  }

  private async validate(request: IRequest): Promise<User> {
    const user = await this.telegramAuthService.verify(
      request.body.id,
      request.headers[internalRequestTokenHeader] as string,
    );

    if (!user) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.USER_INCORRECT_PHONE_OR_PASSWORD,
        i18n.t('internalRequestTokenNotValid'),
      );
    }

    return user;
  }
}
