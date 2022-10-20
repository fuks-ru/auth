import { Injectable } from '@nestjs/common';
import { EncodingService, SystemErrorFactory } from '@fuks-ru/common-backend';
import { v4 } from 'uuid';

import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';
import { LinkTelegramRequest } from 'backend/LinkTelegram/dto/LinkTelegramRequest';

@Injectable()
export class TelegramLoginService {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Авторизуют пользователя по telegram профилю.
   */
  public async auth(body: LinkTelegramRequest): Promise<User> {
    return (
      (await this.userService.findConfirmedByTelegramId(body.id)) ||
      (await this.register(body))
    );
  }

  /**
   * Регистрирует пользователя.
   */
  private async register(data: LinkTelegramRequest): Promise<User> {
    const hashedPassword = await this.encodingService.hash(v4());

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.telegramId = data.id;
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    user.role = Role.USER;
    user.isConfirmed = true;

    return this.userService.addUserIfNotConfirmed(user);
  }
}
