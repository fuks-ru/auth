import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Recaptcha } from '@nestlab/google-recaptcha';

import { Public } from 'backend/Auth/decorators/Public';
import { EmailVerifyService } from 'backend/Register/modules/EmailVerify/services/EmailVerifyService';
import { BasicRegisterRequest } from 'backend/Register/dto/BasicRegisterRequest';
import { ResendConfirmRequest } from 'backend/Register/dto/ResendConfirmRequest';
import { BasicRegisterService } from 'backend/Register/services/BasicRegisterService';
import { UserService } from 'backend/User/services/UserService';

@Controller('/register')
@ApiTags('Register')
export class RegisterController {
  public constructor(
    private readonly basicRegisterService: BasicRegisterService,
    private readonly userService: UserService,
    private readonly emailVerifyService: EmailVerifyService,
  ) {}

  /**
   * Маршрут для регистрации по логину и паролю.
   */
  @Post('/basic')
  @ApiOperation({
    operationId: 'registerBasic',
  })
  @Recaptcha()
  @Public()
  public async basic(@Body() body: BasicRegisterRequest): Promise<void> {
    await this.basicRegisterService.register(body);
  }

  /**
   * Повторная отправка кода подтверждения.
   */
  @Post('/resend-confirm')
  @ApiOperation({
    operationId: 'registerResendConfirm',
  })
  @Recaptcha()
  @Public()
  public async resend(@Body() body: ResendConfirmRequest): Promise<void> {
    const user = await this.userService.getUnConfirmedByEmail(body.email);

    await this.emailVerifyService.send(user, body.redirectFrom);
  }
}
