import { Module } from '@nestjs/common';

import { ConfirmEmailController } from 'backend/Confirm/ConfirmEmail/controllers/ConfirmEmailController';
import { ConfirmEmailService } from 'backend/Confirm/ConfirmEmail/services/ConfirmEmailService';
import { SetJwtCookieModule } from 'backend/SetJwtCookie/SetJwtCookieModule';
import { UserModule } from 'backend/User/UserModule';
import { ConfirmCodeModule } from 'backend/ConfirmCode/ConfirmCodeModule';

@Module({
  imports: [UserModule, SetJwtCookieModule, ConfirmCodeModule],
  providers: [ConfirmEmailService],
  controllers: [ConfirmEmailController],
  exports: [ConfirmEmailService],
})
export class ConfirmEmailModule {}
