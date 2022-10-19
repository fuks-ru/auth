import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { CommonErrorCode } from '@fuks-ru/common';
import { Request as ExpressRequest } from 'express';

import { User } from 'backend/User/entities/User';
import { AuthTelegramService } from 'backend/Auth/services/AuthTelegramService';

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
      request.headers['X-INTERNAL-TOKEN'] as string,
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
