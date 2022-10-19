import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { AuthGuard } from '@nestjs/passport';

import { PhoneRegisterService } from 'backend/Register/PhoneRegister/PhoneRegisterService';
import { PhoneRegisterRequest } from 'backend/Register/PhoneRegister/dto/PhoneRegisterRequest';

@Controller('/register/phone')
@ApiTags('PhoneRegister')
export class PhoneRegisterController {
  public constructor(
    private readonly phoneRegisterService: PhoneRegisterService,
  ) {}

  /**
   * Маршрут для регистрации по телефону и паролю.
   */
  @Post('/phone')
  @ApiOperation({
    operationId: 'registerPhone',
  })
  @Recaptcha()
  @UseGuards(AuthGuard('not-auth'))
  public async phone(@Body() body: PhoneRegisterRequest): Promise<void> {
    await this.phoneRegisterService.register(body);
  }
}
