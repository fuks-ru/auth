import { I18nResolver, SystemErrorFactory, CommonErrorCode } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request as ExpressRequest } from 'express';

import { User } from 'backend/User/entities/User';
import { AuthTelegramService } from 'backend/Auth/services/AuthTelegramService';
import { internalRequestTokenHeader } from 'backend/constants';

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
      request.get(internalRequestTokenHeader),
    );

    if (!user) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        CommonErrorCode.UNAUTHORIZED,
        i18n.t('unauthorized'),
      );
    }

    return user;
  }
}
