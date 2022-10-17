import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { UserModule } from 'backend/User/UserModule';
import { PhoneRegisterService } from 'backend/Register/PhoneRegister/PhoneRegisterService';
import { ConfirmPhoneModule } from 'backend/Confirm/ConfirmPhone/ConfirmPhoneModule';
import { PhoneRegisterController } from 'backend/Register/PhoneRegister/PhoneRegisterController';

@Module({
  imports: [EncodingModule, UserModule, ConfirmPhoneModule],
  providers: [PhoneRegisterService],
  controllers: [PhoneRegisterController],
})
export class PhoneRegisterModule {}
