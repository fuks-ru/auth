import { Injectable } from '@nestjs/common';

import { LoginService } from 'backend/Login/services/LoginService';
import { UserService } from 'backend/User/services/UserService';
import { ConfirmRequest } from 'backend/Register/modules/EmailVerify/dto/ConfirmRequest';
import { ConfirmCodeService } from 'backend/ConfirmCode/services/ConfirmCodeService';

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
    const confirmCode = await this.confirmCodeService.getByValueAndEmail(
      data.confirmCode,
      data.email,
    );

    const user = await this.userService.confirmByConfirmCode(confirmCode);

    await this.confirmCodeService.removeById(confirmCode.id);

    this.loginService.login(user);
  }
}
