import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ForgotPasswordCode } from 'backend/ForgotPasswordCode/entities/ForgotPasswordCode';
import { UserModule } from 'backend/User/UserModule';
import { ForgotPasswordCodeService } from 'backend/ForgotPasswordCode/services/ForgotPasswordCodeService';

@Module({
  imports: [TypeOrmModule.forFeature([ForgotPasswordCode]), UserModule],
  providers: [ForgotPasswordCodeService],
  exports: [ForgotPasswordCodeService],
})
export class ForgotPasswordCodeModule {}
