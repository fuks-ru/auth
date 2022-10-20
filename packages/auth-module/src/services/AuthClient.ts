import { Client, getApi } from '@fuks-ru/auth-client/dist/client/axios';
import { Inject, Injectable } from '@nestjs/common';

import { IAuthModuleOptions } from 'auth-module/types/IAuthModuleOptions';

@Injectable()
export class AuthClient {
  private authApi!: Client;

  public constructor(
    @Inject('AUTH_MODULE_OPTIONS')
    private readonly options: IAuthModuleOptions,
  ) {
    void this.initApi(options.authUrl);
  }

  /**
   * Получает клиент.
   */
  public getClient(): Client {
    return this.authApi;
  }

  private async initApi(authUrl: string): Promise<void> {
    this.authApi = await getApi(authUrl);
  }
}
