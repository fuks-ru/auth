// eslint-disable-next-line max-classes-per-file
import { DynamicModule, Module } from '@nestjs/common';
import { ApiModule, Configuration } from '@fuks-ru/auth-client';

import { AuthJwtStrategy } from 'auth-module/strategies/AuthJwtStrategy';
import {
  IAuthModuleAsyncOptions,
  IAuthModuleOptions,
} from 'auth-module/types/IAuthModuleOptions';

class ApiModuleDynamic extends ApiModule {
  public static forRootAsync(options: IAuthModuleAsyncOptions): DynamicModule {
    return {
      module: ApiModule,
      imports: options.imports,
      providers: [
        {
          provide: Configuration,
          inject: options.inject,
          useFactory: async (...args: unknown[]) => {
            const config = await options.useFactory(...args);

            return new Configuration({
              basePath: config.authUrl,
            });
          },
        },
      ],
    };
  }
}

@Module({})
export class AuthModule {
  /**
   * Регистрирует модуль.
   */
  public static forRoot(options: IAuthModuleOptions): DynamicModule {
    return {
      imports: [
        ApiModule.forRoot(
          () =>
            new Configuration({
              basePath: options.authUrl,
              withCredentials: true,
            }),
        ),
      ],
      module: AuthModule,
      global: true,
      providers: [
        AuthJwtStrategy,
        {
          provide: 'AUTH_MODULE_OPTIONS',
          useValue: options,
        },
      ],
    };
  }

  /**
   * Регистрирует модуль асинхронно.
   */
  public static forRootAsync(options: IAuthModuleAsyncOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        ApiModuleDynamic.forRootAsync({
          imports: options.imports,
          useFactory: options.useFactory,
          inject: options.inject,
        }),
        ...(options.imports ?? []),
      ],
      global: true,
      providers: [
        AuthJwtStrategy,
        {
          provide: 'AUTH_MODULE_OPTIONS',
          inject: options.inject,
          useFactory: options.useFactory,
        },
      ],
    };
  }
}
