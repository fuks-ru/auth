import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { SetJwtCookieService } from 'backend/SetJwtCookie/SetJwtCookieService';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => configGetter.getJwtConfig(),
    }),
    UserModule,
  ],
  providers: [SetJwtCookieService],
  exports: [SetJwtCookieService],
})
export class SetJwtCookieModule {}
