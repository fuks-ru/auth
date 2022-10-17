import { Injectable } from '@nestjs/common';
import { EncodingService } from '@fuks-ru/common-backend';

import { EmailRegisterRequest } from 'backend/Register/EmailRegister/dto/EmailRegisterRequest';
import { ConfirmEmailService } from 'backend/Confirm/ConfirmEmail/services/ConfirmEmailService';
import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class EmailRegisterService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
    private readonly confirmEmailService: ConfirmEmailService,
  ) {}

  /**
   * Регистрирует пользователя.
   */
  public async register(registerRequest: EmailRegisterRequest): Promise<User> {
    const hashedPassword = await this.encodingService.hash(
      registerRequest.password,
    );

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.email = registerRequest.email;
    user.role = Role.USER;

    const createdUser = await this.userService.addUserIfNotConfirmed(user);

    await this.confirmEmailService.send(createdUser);

    return user;
  }
}
