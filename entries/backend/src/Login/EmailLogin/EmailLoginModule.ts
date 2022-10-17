import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { EmailLoginController } from 'backend/Login/EmailLogin/controllers/EmailLoginController';
import { EmailLoginService } from 'backend/Login/EmailLogin/services/EmailLoginService';
import { EmailLoginStrategy } from 'backend/Login/EmailLogin/strategies/EmailLoginStrategy';
import { SetJwtCookieModule } from 'backend/SetJwtCookie/SetJwtCookieModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, EncodingModule, SetJwtCookieModule],
  providers: [EmailLoginService, EmailLoginStrategy],
  controllers: [EmailLoginController],
})
export class EmailLoginModule {}
