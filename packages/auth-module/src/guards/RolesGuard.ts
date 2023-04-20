import {
  I18nResolver,
  SystemErrorFactory,
  CommonErrorCode,
} from '@fuks-ru/common-backend';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserVerifyResponse } from '@fuks-ru/auth-client/nest';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Проверяет, можно ли пускать пользователя с указанной ролью по маршруту.
   */
  public canActivate(context: ExecutionContext): boolean {
    const contextHandler = context.getHandler();

    const requiredRoles = this.reflector.get<
      UserVerifyResponse.RoleEnum[] | undefined
    >('roles', contextHandler);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{
      /**
       * Пользователь.
       */
      user?: UserVerifyResponse;
    }>();

    if (user?.role === undefined || !requiredRoles.includes(user.role)) {
      const i18n = this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        i18n.t('forbidden'),
      );
    }

    return true;
  }
}
