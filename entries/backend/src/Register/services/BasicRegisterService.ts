import { Injectable } from '@nestjs/common';
import { EncodingService } from '@fuks-ru/common-backend';

import { BasicRegisterRequest } from 'backend/Register/dto/BasicRegisterRequest';
import { EmailVerifyService } from 'backend/Register/modules/EmailVerify/services/EmailVerifyService';
import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class BasicRegisterService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
    private readonly emailVerifyService: EmailVerifyService,
  ) {}

  /**
   * Регистрирует пользователя.
   */
  public async register(registerRequest: BasicRegisterRequest): Promise<User> {
    const hashedPassword = await this.encodingService.hash(
      registerRequest.password,
    );

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.email = registerRequest.email;
    user.role = Role.USER;

    const createdUser = await this.userService.addUserIfNotConfirmed(user);

    await this.emailVerifyService.send(createdUser);

    return user;
  }
}
