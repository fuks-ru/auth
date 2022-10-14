import { Injectable } from '@nestjs/common';
import { SystemErrorFactory } from '@fuks-ru/common-backend';

import { User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';
import {
  IRegisterData,
  TelegramRegisterService,
} from 'backend/Register/services/TelegramRegisterService';

@Injectable()
export class TelegramLoginAuth {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
    private readonly telegramRegisterService: TelegramRegisterService,
  ) {}

  /**
   * Авторизуют пользователя по google профилю.
   */
  public async auth(body: IRegisterData): Promise<User> {
    return (
      (await this.userService.findConfirmedByTelegramId(body.id)) ||
      (await this.telegramRegisterService.register(body))
    );
  }
}
