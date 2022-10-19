import { Module } from '@nestjs/common';

import { LinkTelegramService } from 'backend/LinkTelegram/LinkTelegramService';
import { LinkTelegramController } from 'backend/LinkTelegram/LinkTelegramController';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [UserModule],
  controllers: [LinkTelegramController],
  providers: [LinkTelegramService],
  exports: [LinkTelegramService],
})
export class LinkTelegramModule {}
