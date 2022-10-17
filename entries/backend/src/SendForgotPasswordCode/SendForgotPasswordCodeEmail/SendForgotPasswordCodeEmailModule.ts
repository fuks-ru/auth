import { Module } from '@nestjs/common';

import { UserModule } from 'backend/User/UserModule';
import { SendForgotPasswordCodeEmailService } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodeEmail/SendForgotPasswordCodeEmailService';
import { SendForgotPasswordCodeEmailController } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodeEmail/SendForgotPasswordCodeEmailController';
import { ForgotPasswordCodeModule } from 'backend/ForgotPasswordCode/ForgotPasswordCodeModule';

@Module({
  imports: [ForgotPasswordCodeModule, UserModule],
  providers: [SendForgotPasswordCodeEmailService],
  controllers: [SendForgotPasswordCodeEmailController],
})
export class SendForgotPasswordCodeEmailModule {}
