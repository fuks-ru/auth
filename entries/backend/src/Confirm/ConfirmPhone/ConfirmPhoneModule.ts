import { Module } from '@nestjs/common';

import { ConfirmPhoneController } from 'backend/Confirm/ConfirmPhone/controllers/ConfirmPhoneController';
import { SetJwtCookieModule } from 'backend/SetJwtCookie/SetJwtCookieModule';
import { UserModule } from 'backend/User/UserModule';
import { ConfirmPhoneService } from 'backend/Confirm/ConfirmPhone/services/ConfirmPhoneService';
import { SmsSenderModule } from 'backend/SmsSender/SmsSenderModule';
import { ConfirmCodeModule } from 'backend/ConfirmCode/ConfirmCodeModule';

@Module({
  imports: [UserModule, SetJwtCookieModule, SmsSenderModule, ConfirmCodeModule],
  providers: [ConfirmPhoneService],
  controllers: [ConfirmPhoneController],
  exports: [ConfirmPhoneService],
})
export class ConfirmPhoneModule {}
