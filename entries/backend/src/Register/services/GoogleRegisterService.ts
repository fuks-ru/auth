import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { EncodingService } from '@fuks-ru/common-backend';

import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class GoogleRegisterService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
  ) {}

  /**
   * Регистрирует пользователя.
   */
  public async register(email: string): Promise<User> {
    const hashedPassword = await this.encodingService.hash(v4());

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.email = email;
    user.role = Role.USER;
    user.isConfirmed = true;

    return this.userService.addUserIfNotConfirmed(user);
  }
}
