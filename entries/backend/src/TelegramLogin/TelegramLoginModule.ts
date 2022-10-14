import { Module } from '@nestjs/common';

import { TelegramLoginController } from 'backend/TelegramLogin/controllers/TelegramLoginController';
import { TelegramLoginAuth } from 'backend/TelegramLogin/services/TelegramLoginAuth';
import { TelegramLoginStrategy } from 'backend/TelegramLogin/strategies/TelegramLoginStrategy';
import { LoginModule } from 'backend/Login/LoginModule';
import { RegisterModule } from 'backend/Register/RegisterModule';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule, RegisterModule, LoginModule],
  providers: [TelegramLoginAuth, TelegramLoginStrategy],
  controllers: [TelegramLoginController],
})
export class TelegramLoginModule {}
