import { Injectable } from '@nestjs/common';
import { EncodingService, SystemErrorFactory } from '@fuks-ru/common-backend';
import { v4 } from 'uuid';

import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';
import { TelegramBotLoginRequest } from 'backend/Login/TelegramBotLogin/dto/TelegramBotLoginRequest';

@Injectable()
export class TelegramBotLoginService {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Авторизуют пользователя по telegram боту.
   */
  public async auth(body: TelegramBotLoginRequest): Promise<User> {
    const [telegramUser, phoneUser] = await Promise.all([
      this.userService.findConfirmedByTelegramId(body.id),
      this.userService.findConfirmedByPhone(body.phone),
    ]);

    const isPhoneExists = telegramUser?.phone || phoneUser;

    if (telegramUser && isPhoneExists) {
      return this.updateName(telegramUser, body);
    }

    if (telegramUser && !isPhoneExists) {
      const user = await this.userService.changePhone(telegramUser, body.phone);

      return this.updateName(user, body);
    }

    if (!telegramUser && phoneUser) {
      const user = await this.userService.changeTelegramId(phoneUser, body.id);

      return this.updateName(user, body);
    }

    return this.register(body);
  }

  private async updateName(
    telegramUser: User,
    body: TelegramBotLoginRequest,
  ): Promise<User> {
    return this.userService.addOrUpdateUser({
      ...telegramUser,
      telegramId: body.id,
      firstName: telegramUser.firstName || body.firstName,
      lastName: telegramUser.lastName || body.lastName,
    });
  }

  /**
   * Регистрирует пользователя.
   */
  private async register(data: TelegramBotLoginRequest): Promise<User> {
    const hashedPassword = await this.encodingService.hash(v4());

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.telegramId = data.id;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.role = Role.USER;
    user.isConfirmed = true;

    return this.userService.addUserIfNotConfirmed(user);
  }
}
