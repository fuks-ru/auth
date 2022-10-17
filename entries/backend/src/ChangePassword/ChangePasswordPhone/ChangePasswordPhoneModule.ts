import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { UserModule } from 'backend/User/UserModule';
import { ChangePasswordPhoneService } from 'backend/ChangePassword/ChangePasswordPhone/ChangePasswordPhoneService';
import { ChangePasswordPhoneController } from 'backend/ChangePassword/ChangePasswordPhone/ChangePasswordPhoneController';
import { ForgotPasswordCodeModule } from 'backend/ForgotPasswordCode/ForgotPasswordCodeModule';

@Module({
  imports: [ForgotPasswordCodeModule, EncodingModule, UserModule],
  providers: [ChangePasswordPhoneService],
  controllers: [ChangePasswordPhoneController],
})
export class ChangePasswordPhoneModule {}
