import { DynamicModule, Module } from '@nestjs/common';

import { AuthJwtStrategy } from 'auth-module/strategies/AuthJwtStrategy';
import {
  IAuthModuleAsyncOptions,
  IAuthModuleOptions,
} from 'auth-module/types/IAuthModuleOptions';

@Module({})
export class AuthModule {
  /**
   * Регистрирует модуль.
   */
  public static forRoot(options: IAuthModuleOptions): DynamicModule {
    return {
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
      imports: options.imports,
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
