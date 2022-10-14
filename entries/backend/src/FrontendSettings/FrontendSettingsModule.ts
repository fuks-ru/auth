import { Module } from '@nestjs/common';

import { FrontendSettingsController } from 'backend/FrontendSettings/controllers/FrontendSettingsController';

@Module({
  controllers: [FrontendSettingsController],
})
export class FrontendSettingsModule {}
