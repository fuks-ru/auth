import { Client, getApi, TApiResponse } from '@fuks-ru/auth-client';
import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { CommonErrorCode, UnauthorizedError } from '@fuks-ru/common';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';

import { IAuthModuleOptions } from 'auth-module/types/IAuthModuleOptions';

interface IRequest extends ExpressRequest {
  cookies: {
    jwtToken?: string;
  };
}

@Injectable()
export class AuthClientStrategy extends PassportStrategy(
  Strategy,
  'auth-client',
) {
  private authApi!: Client;

  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    @Inject('AUTH_MODULE_OPTIONS')
    private readonly options: IAuthModuleOptions,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();

    void this.initApi(options.authUrl);
  }

  private async initApi(authUrl: string): Promise<void> {
    this.authApi = await getApi(authUrl);
  }

  private async validate(
    request: IRequest,
  ): Promise<TApiResponse<'authVerify'>> {
    try {
      this.authApi.defaults.headers.common.cookie =
        request.headers.cookie || '';

      const response = await this.authApi.authVerify(null);

      return response.data;
    } catch (error) {
      const i18n = await this.i18nResolver.resolve();

      if (error instanceof UnauthorizedError) {
        throw this.systemErrorFactory.create(
          CommonErrorCode.UNAUTHORIZED,
          i18n.t('unauthorized'),
        );
      }

      throw this.systemErrorFactory.create(
        CommonErrorCode.REMOTE_HOST_ERROR,
        i18n.t('remoteHostError'),
        error,
      );
    }
  }
}
