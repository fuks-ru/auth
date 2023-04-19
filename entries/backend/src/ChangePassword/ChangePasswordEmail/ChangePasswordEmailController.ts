import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { ChangePasswordEmailService } from 'backend/ChangePassword/ChangePasswordEmail/ChangePasswordEmailService';
import { ChangePasswordRequest } from 'backend/ChangePassword/ChangePasswordEmail/dto/ChangePasswordRequest';

@Controller('/change-password/email')
@ApiTags('ChangePassword')
export class ChangePasswordEmailController {
  public constructor(
    private readonly changePasswordService: ChangePasswordEmailService,
  ) {}

  /**
   * Маршрут для смены пароля по email.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'changePasswordEmail',
  })
  @ApiHeader({
    name: 'recaptcha',
  })
  @UseGuards(GoogleRecaptchaGuard, AuthGuard('not-auth'))
  public async changeByEmail(
    @Body() body: ChangePasswordRequest,
  ): Promise<void> {
    await this.changePasswordService.change(body);
  }
}
