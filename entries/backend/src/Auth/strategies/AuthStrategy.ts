import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { CommonErrorCode } from '@fuks-ru/common';

import { AuthService } from 'backend/Auth/services/AuthService';
import { User } from 'backend/User/entities/User';
import { IRequest } from 'backend/Auth/types/IRequest';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly authService: AuthService,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();
  }

  private async validate(request: IRequest): Promise<User> {
    const user = await this.authService.verify(request);

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
