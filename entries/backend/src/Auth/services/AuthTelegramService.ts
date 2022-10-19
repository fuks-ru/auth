import { Injectable } from '@nestjs/common';

import { UserService } from 'backend/User/services/UserService';
import { User } from 'backend/User/entities/User';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

@Injectable()
export class AuthTelegramService {
  public constructor(
    private readonly userService: UserService,
    private readonly configGetter: ConfigGetter,
  ) {}

  /**
   * Проверяет токен и возвращает пользователя.
   */
  public async verify(
    id: number | undefined,
    internalToken: string | undefined,
  ): Promise<User | null> {
    if (!internalToken || !id) {
      return null;
    }

    if (internalToken !== this.configGetter.getInternalRequestToken()) {
      return null;
    }

    const user = await this.userService.findConfirmedByTelegramId(id);

    if (!user) {
      return null;
    }

    return user;
  }
}
