import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { PhoneLoginController } from 'backend/PhoneLogin/controllers/PhoneLoginController';
import { PhoneLoginService } from 'backend/PhoneLogin/services/PhoneLoginService';
import { PhoneLoginStrategy } from 'backend/PhoneLogin/strategies/PhoneLoginStrategy';
import { LoginModule } from 'backend/Login/LoginModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, EncodingModule, LoginModule],
  providers: [PhoneLoginService, PhoneLoginStrategy],
  controllers: [PhoneLoginController],
})
export class PhoneLoginModule {}
