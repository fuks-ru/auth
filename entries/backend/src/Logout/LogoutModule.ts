import { Module } from '@nestjs/common';

import { LogoutController } from 'backend/Logout/controllers/LogoutController';

@Module({
  controllers: [LogoutController],
})
export class LogoutModule {}
