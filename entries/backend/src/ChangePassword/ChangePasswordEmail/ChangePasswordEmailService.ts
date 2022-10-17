import { EncodingService } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { UserService } from 'backend/User/services/UserService';
import { ForgotPasswordCodeService } from 'backend/ForgotPasswordCode/services/ForgotPasswordCodeService';
import { ChangePasswordRequest } from 'backend/ChangePassword/ChangePasswordEmail/dto/ChangePasswordRequest';

@Injectable()
export class ChangePasswordEmailService {
  public constructor(
    private readonly userService: UserService,
    private readonly encodingService: EncodingService,
    private readonly forgotPasswordCodeService: ForgotPasswordCodeService,
  ) {}

  /**
   * Смена пароля по email.
   */
  public async change(request: ChangePasswordRequest): Promise<void> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeService.getByValueAndEmail(
        request.email,
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
