import { EncodingService } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { ChangePasswordRequest } from 'backend/ForgotPassword/dto/ChangePasswordRequest';
import { UserService } from 'backend/User/services/UserService';
import { ForgotPasswordCodeService } from 'backend/ForgotPassword/services/ForgotPasswordCodeService';

@Injectable()
export class ChangePasswordService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
  ) {}

  /**
   * Смена пароля.
   */
  public async change(
    changePasswordRequest: ChangePasswordRequest,
  ): Promise<void> {
    const forgotPasswordCode = await this.forgotPasswordCodeService.getByValue(
      changePasswordRequest.forgotPasswordCode,
    );

    const hashedPassword = await this.encodingService.hash(
      changePasswordRequest.password,
    );

    await this.userService.changePasswordByForgotPasswordCode(
      forgotPasswordCode,
      hashedPassword,
    );

    await this.forgotPasswordCodeService.removeById(forgotPasswordCode.id);
  }
}
