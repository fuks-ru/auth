import { Module } from '@nestjs/common';

import { ConfirmationController } from 'backend/Register/modules/EmailVerify/controllers/ConfirmationController';
import { ConfirmationService } from 'backend/Register/modules/EmailVerify/services/ConfirmationService';
import { EmailVerifyService } from 'backend/Register/modules/EmailVerify/services/EmailVerifyService';
import { LoginModule } from 'backend/Login/LoginModule';
import { UserModule } from 'backend/User/UserModule';
import { ConfirmCodeModule } from 'backend/ConfirmCode/ConfirmCodeModule';

@Module({
  imports: [UserModule, LoginModule, ConfirmCodeModule],
  providers: [EmailVerifyService, ConfirmationService],
  controllers: [ConfirmationController],
  exports: [EmailVerifyService],
})
export class EmailVerifyModule {}
