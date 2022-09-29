import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from 'backend/Auth/guards/AuthGuard';
import { RolesGuard } from 'backend/Auth/guards/RolesGuard';
import { AuthStrategy } from 'backend/Auth/strategies/AuthStrategy';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { AuthController } from 'backend/Auth/contollers/AuthController';
import { AuthService } from 'backend/Auth/services/AuthService';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => configGetter.getJwtConfig(),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
