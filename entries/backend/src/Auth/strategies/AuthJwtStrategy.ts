import {
  I18nResolver,
  SystemErrorFactory,
  CommonErrorCode,
} from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';

import { AuthJwtService } from 'backend/Auth/services/AuthJwtService';
import { User } from 'backend/User/entities/User';
import { IRequest } from 'backend/Auth/types/IRequest';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly authService: AuthJwtService,
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
