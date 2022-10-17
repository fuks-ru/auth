import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { GoogleLoginController } from 'backend/Login/GoogleLogin/controllers/GoogleLoginController';
import { GoogleLoginService } from 'backend/Login/GoogleLogin/services/GoogleLoginService';
import { GoogleLoginStrategy } from 'backend/Login/GoogleLogin/strategies/GoogleLoginStrategy';
import { SetJwtCookieModule } from 'backend/SetJwtCookie/SetJwtCookieModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, SetJwtCookieModule, EncodingModule],
  providers: [GoogleLoginService, GoogleLoginStrategy],
  controllers: [GoogleLoginController],
})
export class GoogleLoginModule {}
