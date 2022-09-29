import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { EmailVerifyModule } from 'backend/Register/modules/EmailVerify/EmailVerifyModule';
import { RegisterController } from 'backend/Register/controllers/RegisterController';
import { BasicRegisterService } from 'backend/Register/services/BasicRegisterService';
import { EmailRegisterService } from 'backend/Register/services/EmailRegisterService';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [EncodingModule, UserModule, EmailVerifyModule],
  providers: [BasicRegisterService, EmailRegisterService],
  controllers: [RegisterController],
  exports: [EmailRegisterService],
})
export class RegisterModule {}
