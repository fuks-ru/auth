import { RedirectErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { ConfirmCodeService } from 'backend/Register/modules/EmailVerify/services/ConfirmCodeService';
import { LoginService } from 'backend/Login/services/LoginService';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class ConfirmationService {
  public constructor(
    private readonly confirmCodeService: ConfirmCodeService,
    private readonly userService: UserService,
    private readonly redirectErrorFactory: RedirectErrorFactory,
    private readonly loginService: LoginService,
  ) {}

  /**
   * Подтверждает email пользователя, активирует его и осуществляет вход.
   */
  public async confirm(value: string): Promise<void> {
    const confirmCode = await this.confirmCodeService.getByValue(value);

    const user = await this.userService.confirmByConfirmCode(confirmCode);

    await this.confirmCodeService.removeById(confirmCode.id);

    this.loginService.login(user, confirmCode.redirectFrom);
  }
}
