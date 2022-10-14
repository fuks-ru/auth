import { EncodingService } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { ChangePasswordEmailRequest } from 'backend/ForgotPassword/dto/ChangePasswordEmailRequest';
import { UserService } from 'backend/User/services/UserService';
import { ForgotPasswordCodeService } from 'backend/ForgotPassword/services/ForgotPasswordCodeService';
import { User } from 'backend/User/entities/User';
import { ChangePasswordPhoneRequest } from 'backend/ForgotPassword/dto/ChangePasswordPhoneRequest';

@Injectable()
export class ChangePasswordService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
  ) {}

  /**
   * Смена пароля по email.
   */
  public async changeByEmail(
    request: ChangePasswordEmailRequest,
  ): Promise<void> {
    const user = await this.userService.getConfirmedByEmail(request.email);

    await this.change(user, request.forgotPasswordCode, request.password);
  }

  /**
   * Смена пароля по телефону.
   */
  public async changeByPhone(
    request: ChangePasswordPhoneRequest,
  ): Promise<void> {
    const user = await this.userService.getUnConfirmedByPhone(request.phone);

    await this.change(user, request.forgotPasswordCode, request.password);
  }

  private async change(
    user: User,
    code: string,
    password: string,
  ): Promise<void> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeService.getByValueAndUser(user, code);

    const hashedPassword = await this.encodingService.hash(password);

    await this.userService.changePasswordByForgotPasswordCode(
      forgotPasswordCode,
      hashedPassword,
    );

    await this.forgotPasswordCodeService.removeById(forgotPasswordCode.id);
  }
}
