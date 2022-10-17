import { Module } from '@nestjs/common';
import { EncodingModule } from '@fuks-ru/common-backend';

import { ConfirmEmailModule } from 'backend/Confirm/ConfirmEmail/ConfirmEmailModule';
import { EmailRegisterService } from 'backend/Register/EmailRegister/EmailRegisterService';
import { UserModule } from 'backend/User/UserModule';
import { EmailRegisterController } from 'backend/Register/EmailRegister/EmailRegisterController';

@Module({
  imports: [EncodingModule, UserModule, ConfirmEmailModule],
  providers: [EmailRegisterService],
  controllers: [EmailRegisterController],
})
export class EmailRegisterModule {}
