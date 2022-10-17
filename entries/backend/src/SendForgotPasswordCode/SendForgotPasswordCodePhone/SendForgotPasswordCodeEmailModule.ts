import { Module } from '@nestjs/common';

import { UserModule } from 'backend/User/UserModule';
import { SmsSenderModule } from 'backend/SmsSender/SmsSenderModule';
import { SendForgotPasswordCodePhoneService } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodePhone/SendForgotPasswordCodePhoneService';
import { SendForgotPasswordCodePhoneController } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodePhone/SendForgotPasswordCodePhoneController';
import { ForgotPasswordCodeModule } from 'backend/ForgotPasswordCode/ForgotPasswordCodeModule';

@Module({
  imports: [ForgotPasswordCodeModule, UserModule, SmsSenderModule],
  providers: [SendForgotPasswordCodePhoneService],
  controllers: [SendForgotPasswordCodePhoneController],
})
export class SendForgotPasswordCodePhoneModule {}
