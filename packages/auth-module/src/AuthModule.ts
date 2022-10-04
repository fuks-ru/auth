import { DynamicModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthClientStrategy } from 'auth-module/strategies/AuthClientStrategy';
import { RolesGuard } from 'auth-module/guards/RolesGuard';
import { AuthClientGuard } from 'auth-module/guards/AuthClientGuard';
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
        AuthClientStrategy,
        {
          provide: APP_GUARD,
          useClass: AuthClientGuard,
        },
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
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
        AuthClientStrategy,
        {
          provide: APP_GUARD,
          useClass: AuthClientGuard,
        },
        {
          provide: APP_GUARD,
          useClass: RolesGuard,
        },
        {
          provide: 'AUTH_MODULE_OPTIONS',
          inject: options.inject,
          useFactory: options.useFactory,
        },
      ],
    };
  }
}
