import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { LoginService } from 'backend/Login/services/LoginService';
import { UserModule } from 'backend/User/UserModule';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => configGetter.getJwtConfig(),
    }),
    UserModule,
  ],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
