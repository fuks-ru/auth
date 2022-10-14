import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { EncodingService } from '@fuks-ru/common-backend';

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
export class TelegramRegisterService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Регистрирует пользователя.
   */
  public async register(data: IRegisterData): Promise<User> {
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
