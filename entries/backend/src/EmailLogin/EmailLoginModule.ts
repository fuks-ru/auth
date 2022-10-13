import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { EmailLoginController } from 'backend/EmailLogin/controllers/EmailLoginController';
import { EmailLoginService } from 'backend/EmailLogin/services/EmailLoginService';
import { EmailLoginStrategy } from 'backend/EmailLogin/strategies/EmailLoginStrategy';
import { LoginModule } from 'backend/Login/LoginModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, EncodingModule, LoginModule],
  providers: [EmailLoginService, EmailLoginStrategy],
  controllers: [EmailLoginController],
})
export class EmailLoginModule {}
