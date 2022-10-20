import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { UserModule } from 'backend/User/UserModule';
import { TelegramBotLoginStrategy } from 'backend/Login/TelegramBotLogin/strategies/TelegramBotLoginStrategy';
import { TelegramBotLoginService } from 'backend/Login/TelegramBotLogin/services/TelegramBotLoginService';
import { TelegramBotLoginController } from 'backend/Login/TelegramBotLogin/controllers/TelegramBotLoginController';

@Module({
  imports: [UserModule, EncodingModule],
  providers: [TelegramBotLoginService, TelegramBotLoginStrategy],
  controllers: [TelegramBotLoginController],
})
export class TelegramBotLoginModule {}
