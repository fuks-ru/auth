import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { UserVerifyResponse } from '@fuks-ru/auth-client/nest';

/**
 * Помечает роли, которым доступен маршрут.
 */
export const Roles = (
  ...roles: UserVerifyResponse.RoleEnum[]
): CustomDecorator<string> => SetMetadata('roles', roles);
