import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { Public } from 'backend/Auth/decorators/Public';
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
  @Recaptcha()
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async changeByEmail(
    @Body() body: ChangePasswordRequest,
  ): Promise<void> {
    await this.changePasswordService.change(body);
  }
}
