import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncodingModule } from '@fuks-ru/common-backend';

import { ForgotPasswordCode } from 'backend/ForgotPassword/entities/ForgotPasswordCode';
import { ForgotPasswordService } from 'backend/ForgotPassword/services/ForgotPasswordService';
import { ForgotPasswordCodeService } from 'backend/ForgotPassword/services/ForgotPasswordCodeService';
import { UserModule } from 'backend/User/UserModule';
import { ChangePasswordService } from 'backend/ForgotPassword/services/ChangePasswordService';
import { ForgotPasswordController } from 'backend/ForgotPassword/controllers/ForgotPasswordController';

@Module({
  imports: [
    TypeOrmModule.forFeature([ForgotPasswordCode]),
    EncodingModule,
    UserModule,
  ],
  providers: [
    ForgotPasswordService,
    ForgotPasswordCodeService,
    ChangePasswordService,
  ],
  controllers: [ForgotPasswordController],
})
export class ForgotPasswordModule {}
