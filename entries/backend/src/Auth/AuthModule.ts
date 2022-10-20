import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthJwtStrategy } from 'backend/Auth/strategies/AuthJwtStrategy';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { AuthController } from 'backend/Auth/contollers/AuthController';
import { AuthJwtService } from 'backend/Auth/services/AuthJwtService';
import { UserModule } from 'backend/User/UserModule';
import { NotAuthStrategy } from 'backend/Auth/strategies/NotAuthStrategy';
import { CheckNotAuth } from 'backend/Auth/services/CheckNotAuth';
import { AuthTelegramStrategy } from 'backend/Auth/strategies/AuthTelegramStrategy';
import { AuthTelegramService } from 'backend/Auth/services/AuthTelegramService';

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
    AuthJwtService,
    AuthJwtStrategy,
    NotAuthStrategy,
    CheckNotAuth,
    AuthTelegramStrategy,
    AuthTelegramService,
  ],
})
export class AuthModule {}
