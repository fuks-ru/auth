import { EncodingService } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { UserService } from 'backend/User/services/UserService';
import { ForgotPasswordCodeService } from 'backend/ForgotPasswordCode/services/ForgotPasswordCodeService';
import { ChangePasswordRequest } from 'backend/ChangePassword/ChangePasswordPhone/dto/ChangePasswordRequest';

@Injectable()
export class ChangePasswordPhoneService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
  ) {}

  /**
   * Смена пароля по телефону.
   */
  public async change(request: ChangePasswordRequest): Promise<void> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeService.getByValueAndPhone(
        request.phone,
        request.forgotPasswordCode,
      );

    const hashedPassword = await this.encodingService.hash(request.password);

    await this.userService.changePasswordByForgotPasswordCode(
      forgotPasswordCode,
      hashedPassword,
    );

    await this.forgotPasswordCodeService.removeById(forgotPasswordCode.id);
  }
}
