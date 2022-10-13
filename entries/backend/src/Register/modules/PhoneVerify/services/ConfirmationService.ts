import { Injectable } from '@nestjs/common';

import { LoginService } from 'backend/Login/services/LoginService';
import { UserService } from 'backend/User/services/UserService';
import { ConfirmCodeService } from 'backend/ConfirmCode/services/ConfirmCodeService';
import { ConfirmRequest } from 'backend/Register/modules/PhoneVerify/dto/ConfirmRequest';

@Injectable()
export class ConfirmationService {
  public constructor(
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly userService: UserService,
    private readonly loginService: LoginService,
  ) {}

  /**
   * Подтверждает email пользователя, активирует его и осуществляет вход.
   */
  public async confirm(data: ConfirmRequest): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValueAndPhone(
      data.confirmCode,
      data.phone,
    );

    const user = await this.userService.confirmByConfirmCode(confirmCode);

    await this.confirmCodeService.removeById(confirmCode.id);

    this.loginService.login(user);
  }
}
