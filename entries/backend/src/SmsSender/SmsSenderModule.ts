import { Module } from '@nestjs/common';

import { SmsSenderService } from 'backend/SmsSender/services/SmsSenderService';

@Module({
  providers: [SmsSenderService],
  exports: [SmsSenderService],
})
export class SmsSenderModule {}
