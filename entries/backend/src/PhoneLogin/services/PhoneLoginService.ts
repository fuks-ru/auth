import { Injectable } from '@nestjs/common';
import { EncodingService } from '@fuks-ru/common-backend';

import { User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class PhoneLoginService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Валидирует телефон и пароль пользователя.
   */
  public async validateUser(
    phone: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findConfirmedByPhone(phone);

    if (!user) {
      return null;
    }

    const isValidPassword = await this.encodingService.verify(
      user.hashedPassword,
      password,
    );

    if (isValidPassword) {
      return user;
    }

    return null;
  }
}
