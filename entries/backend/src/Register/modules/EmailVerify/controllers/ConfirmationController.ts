import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Public } from 'backend/Auth/decorators/Public';
import { ConfirmRequest } from 'backend/Register/modules/EmailVerify/dto/ConfirmRequest';
import { ConfirmationService } from 'backend/Register/modules/EmailVerify/services/ConfirmationService';

@Controller('/confirmation')
@ApiTags('Confirmation')
export class ConfirmationController {
  public constructor(
    private readonly confirmationService: ConfirmationService,
  ) {}

  /**
   * Маршрут для подтверждения email.
   */
  @Post('/confirm')
  @ApiOperation({
    operationId: 'confirmationConfirm',
  })
  @Public()
  @UseGuards(AuthGuard('not-auth'))
  public async confirm(@Body() body: ConfirmRequest): Promise<void> {
    await this.confirmationService.confirm(body);
  }
}
