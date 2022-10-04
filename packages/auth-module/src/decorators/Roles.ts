import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Schemas } from '@fuks-ru/auth-client';

/**
 * Помечает роли, которым доступен маршрут.
 */
export const Roles = (
  ...roles: Array<Schemas.UserVerifyResponse['role']>
): CustomDecorator<string> => SetMetadata('roles', roles);
