import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';
import { CommonErrorCode } from '@fuks-ru/common';

import { UserVerifyResponse } from 'backend/Auth/dto/UserVerifyResponse';
import { AuthService } from 'backend/Auth/services/AuthService';

interface IRequest extends ExpressRequest {
  cookies: {
    jwtToken?: string;
  };
}

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly authService: AuthService,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();
  }

  private async validate(request: IRequest): Promise<UserVerifyResponse> {
    const { jwtToken } = request.cookies;

    if (!jwtToken) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        i18n.t('forbidden'),
      );
    }

    return this.authService.verify({
      jwtToken,
    });
  }
}
