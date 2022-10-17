import { Injectable } from '@nestjs/common';
import { EncodingService, SystemErrorFactory } from '@fuks-ru/common-backend';
import { v4 } from 'uuid';

import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';

/**
 * Данные для регистрации через telegram.
 */
export interface IRegisterData {
  /**
   * Id.
   */
  id: number;
  /**
   * Имя.
   */
  firstName?: string;
  /**
   * Фамилия.
   */
  lastName?: string;
}

@Injectable()
export class TelegramLoginService {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Авторизуют пользователя по google профилю.
   */
  public async auth(body: IRegisterData): Promise<User> {
    return (
      (await this.userService.findConfirmedByTelegramId(body.id)) ||
      (await this.register(body))
    );
  }

  /**
   * Регистрирует пользователя.
   */
  private async register(data: IRegisterData): Promise<User> {
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
