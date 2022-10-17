import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { UserModule } from 'backend/User/UserModule';
import { ChangePasswordEmailService } from 'backend/ChangePassword/ChangePasswordEmail/ChangePasswordEmailService';
import { ChangePasswordEmailController } from 'backend/ChangePassword/ChangePasswordEmail/ChangePasswordEmailController';
import { ForgotPasswordCodeModule } from 'backend/ForgotPasswordCode/ForgotPasswordCodeModule';

@Module({
  imports: [ForgotPasswordCodeModule, EncodingModule, UserModule],
  providers: [ChangePasswordEmailService],
  controllers: [ChangePasswordEmailController],
})
export class ChangePasswordEmailModule {}
