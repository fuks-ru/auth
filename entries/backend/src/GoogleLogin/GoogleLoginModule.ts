import { Module } from '@nestjs/common';

import { GoogleLoginController } from 'backend/GoogleLogin/controllers/GoogleLoginController';
import { GoogleLoginAuth } from 'backend/GoogleLogin/services/GoogleLoginAuth';
import { GoogleLoginStrategy } from 'backend/GoogleLogin/strategies/GoogleLoginStrategy';
import { LoginModule } from 'backend/Login/LoginModule';
import { RegisterModule } from 'backend/Register/RegisterModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, RegisterModule, LoginModule],
  providers: [GoogleLoginAuth, GoogleLoginStrategy],
  controllers: [GoogleLoginController],
})
export class GoogleLoginModule {}
