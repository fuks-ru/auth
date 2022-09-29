import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { BasicLoginController } from 'backend/BasicLogin/controllers/BasicLoginController';
import { BasicLoginService } from 'backend/BasicLogin/services/BasicLoginService';
import { BasicLoginStrategy } from 'backend/BasicLogin/strategies/BasicLoginStrategy';
import { LoginModule } from 'backend/Login/LoginModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, EncodingModule, LoginModule],
  providers: [BasicLoginService, BasicLoginStrategy],
  controllers: [BasicLoginController],
})
export class BasicAuthModule {}
