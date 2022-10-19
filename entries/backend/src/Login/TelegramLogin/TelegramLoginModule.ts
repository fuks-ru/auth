import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { TelegramLoginController } from 'backend/Login/TelegramLogin/controllers/TelegramLoginController';
import { TelegramLoginService } from 'backend/Login/TelegramLogin/services/TelegramLoginService';
import { TelegramLoginStrategy } from 'backend/Login/TelegramLogin/strategies/TelegramLoginStrategy';
import { SetJwtCookieModule } from 'backend/SetJwtCookie/SetJwtCookieModule';
import { UserModule } from 'backend/User/UserModule';
import { LinkTelegramModule } from 'backend/LinkTelegram/LinkTelegramModule';

@Module({
  imports: [UserModule, SetJwtCookieModule, EncodingModule, LinkTelegramModule],
  providers: [TelegramLoginService, TelegramLoginStrategy],
  controllers: [TelegramLoginController],
})
export class TelegramLoginModule {}
