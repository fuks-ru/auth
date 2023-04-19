import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { ChangePasswordRequest } from 'backend/ChangePassword/ChangePasswordPhone/dto/ChangePasswordRequest';
import { ChangePasswordPhoneService } from 'backend/ChangePassword/ChangePasswordPhone/ChangePasswordPhoneService';

@Controller('/change-password/phone')
@ApiTags('ChangePassword')
export class ChangePasswordPhoneController {
  public constructor(
    private readonly changePasswordService: ChangePasswordPhoneService,
  ) {}

  /**
   * Маршрут для смены пароля по телефону.
   */
  @Post('/')
  @ApiOperation({
    operationId: 'changePasswordPhone',
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
