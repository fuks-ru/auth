import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommonErrorCode } from '@fuks-ru/common';
import { Schemas } from '@fuks-ru/auth-client';

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
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextHandler = context.getHandler();
    const contextClass = context.getClass();

    const requiredRoles = this.reflector.get<
      Array<Schemas.UserVerifyResponse['role']> | undefined
    >('roles', contextHandler);

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      contextHandler,
      contextClass,
    ]);

    if (!requiredRoles || isPublic) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{
      /**
       * Пользователь.
       */
      user?: Schemas.UserVerifyResponse;
    }>();

    if (user?.role === undefined || !requiredRoles.includes(user.role)) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        i18n.t('forbidden'),
      );
    }

    return true;
  }
}
