import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { PhoneLoginController } from 'backend/Login/PhoneLogin/controllers/PhoneLoginController';
import { PhoneLoginService } from 'backend/Login/PhoneLogin/services/PhoneLoginService';
import { PhoneLoginStrategy } from 'backend/Login/PhoneLogin/strategies/PhoneLoginStrategy';
import { SetJwtCookieModule } from 'backend/SetJwtCookie/SetJwtCookieModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, EncodingModule, SetJwtCookieModule],
  providers: [PhoneLoginService, PhoneLoginStrategy],
  controllers: [PhoneLoginController],
})
export class PhoneLoginModule {}
