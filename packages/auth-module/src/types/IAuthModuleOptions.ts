import {
  InjectionToken,
  ModuleMetadata,
  OptionalFactoryDependency,
} from '@nestjs/common';

/**
 * Описывает конфиг модуля.
 */
export interface IAuthModuleOptions {
  /**
   * Маршрут авторизации.
   */
  authUrl: string;
}

/**
 * Описывает асинхронный конфиг модуля.
 */
export interface IAuthModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Сервисы для DI.
   */
  inject?: Array<InjectionToken | OptionalFactoryDependency>;
  /**
   * Функция, возвращающая конфиг.
   */
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<IAuthModuleOptions> | IAuthModuleOptions;
}
