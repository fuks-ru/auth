import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfirmCodeService } from 'backend/ConfirmCode/services/ConfirmCodeService';
import { ConfirmCode } from 'backend/ConfirmCode/entities/ConfirmCode';

@Module({
  imports: [TypeOrmModule.forFeature([ConfirmCode])],
  providers: [ConfirmCodeService],
  exports: [ConfirmCodeService],
})
export class ConfirmCodeModule {}
