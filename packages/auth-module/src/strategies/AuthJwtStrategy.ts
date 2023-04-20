import { AuthService, UserVerifyResponse } from '@fuks-ru/auth-client/nest';
import { isErrorResponse } from '@fuks-ru/common';
import {
  I18nResolver,
  SystemErrorFactory,
  CommonErrorCode,
} from '@fuks-ru/common-backend';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';

import { IAuthModuleOptions } from 'auth-module/types/IAuthModuleOptions';

interface IRequest extends ExpressRequest {
  cookies: {
    jwtToken?: string;
  };
}

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    @Inject('AUTH_MODULE_OPTIONS')
    private readonly options: IAuthModuleOptions,
    private readonly i18nResolver: I18nResolver,
    private readonly authService: AuthService,
  ) {
    super();
  }

  private validate(request: IRequest): Promise<UserVerifyResponse> {
    this.authService.defaultHeaders.cookie = request.headers.cookie || '';

    return firstValueFrom(
      this.authService.authVerify().pipe(
        map((response) => response.data),
        catchError((error: AxiosError) => {
          const i18n = this.i18nResolver.resolve();

          const data = error.response?.data;

          if (!isErrorResponse(data) || data.type !== 'unauthorized') {
            throw this.systemErrorFactory.create(
              CommonErrorCode.REMOTE_HOST_ERROR,
              i18n.t('remoteHostError'),
              error,
            );
          }

          throw this.systemErrorFactory.create(
            CommonErrorCode.UNAUTHORIZED,
            i18n.t('unauthorized'),
          );
        }),
      ),
    );
  }
}
