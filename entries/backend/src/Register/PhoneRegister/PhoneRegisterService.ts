import { Injectable } from '@nestjs/common';
import { EncodingService } from '@fuks-ru/common-backend';

import { Role, User } from 'backend/User/entities/User';
import { UserService } from 'backend/User/services/UserService';
import { PhoneRegisterRequest } from 'backend/Register/PhoneRegister/dto/PhoneRegisterRequest';
import { ConfirmPhoneService } from 'backend/Confirm/ConfirmPhone/services/ConfirmPhoneService';

@Injectable()
export class PhoneRegisterService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
    private readonly phoneVerifyService: ConfirmPhoneService,
  ) {}

  /**
   * Регистрирует пользователя.
   */
  public async register(registerRequest: PhoneRegisterRequest): Promise<User> {
    const hashedPassword = await this.encodingService.hash(
      registerRequest.password,
    );

    const user = new User();

    user.hashedPassword = hashedPassword;
    user.phone = registerRequest.phone;
    user.role = Role.USER;

    const createdUser = await this.userService.addUserIfNotConfirmed(user);

    await this.phoneVerifyService.send(createdUser, user.phone);

    return user;
  }
}
