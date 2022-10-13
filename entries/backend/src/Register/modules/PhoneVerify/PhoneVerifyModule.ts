import { Module } from '@nestjs/common';

import { ConfirmationController } from 'backend/Register/modules/PhoneVerify/controllers/ConfirmationController';
import { ConfirmationService } from 'backend/Register/modules/PhoneVerify/services/ConfirmationService';
import { LoginModule } from 'backend/Login/LoginModule';
import { UserModule } from 'backend/User/UserModule';
import { PhoneVerifyService } from 'backend/Register/modules/PhoneVerify/services/PhoneVerifyService';
import { SmsSenderModule } from 'backend/SmsSender/SmsSenderModule';
import { ConfirmCodeModule } from 'backend/ConfirmCode/ConfirmCodeModule';

@Module({
  imports: [UserModule, LoginModule, SmsSenderModule, ConfirmCodeModule],
  providers: [PhoneVerifyService, ConfirmationService],
  controllers: [ConfirmationController],
  exports: [PhoneVerifyService],
})
export class PhoneVerifyModule {}
