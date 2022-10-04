import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { CommonErrorCode } from '@fuks-ru/common';

import { IRequest } from 'backend/Auth/types/IRequest';
import { CheckNotAuth } from 'backend/Auth/services/CheckNotAuth';

@Injectable()
export class NotAuthStrategy extends PassportStrategy(Strategy, 'not-auth') {
  public constructor(
    private readonly checkNotAuth: CheckNotAuth,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();
  }

  private async validate(request: IRequest): Promise<boolean> {
    const result = await this.checkNotAuth.check(request);

    if (!result) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        CommonErrorCode.ALREADY_AUTH,
        i18n.t('alreadyAuth'),
      );
    }

    return true;
  }
}
