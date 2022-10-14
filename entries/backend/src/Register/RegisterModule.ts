import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { EmailVerifyModule } from 'backend/Register/modules/EmailVerify/EmailVerifyModule';
import { RegisterController } from 'backend/Register/controllers/RegisterController';
import { EmailRegisterService } from 'backend/Register/services/EmailRegisterService';
import { GoogleRegisterService } from 'backend/Register/services/GoogleRegisterService';
import { UserModule } from 'backend/User/UserModule';
import { PhoneRegisterService } from 'backend/Register/services/PhoneRegisterService';
import { PhoneVerifyModule } from 'backend/Register/modules/PhoneVerify/PhoneVerifyModule';
import { TelegramRegisterService } from 'backend/Register/services/TelegramRegisterService';

@Module({
  imports: [EncodingModule, UserModule, EmailVerifyModule, PhoneVerifyModule],
  providers: [
    EmailRegisterService,
    GoogleRegisterService,
    PhoneRegisterService,
    TelegramRegisterService,
  ],
  controllers: [RegisterController],
  exports: [GoogleRegisterService, TelegramRegisterService],
})
export class RegisterModule {}
