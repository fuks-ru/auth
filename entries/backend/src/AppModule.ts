import { CommonModule, EnvGetter } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { MailerModule } from '@nestjs-modules/mailer';

import { AuthModule } from 'backend/Auth/AuthModule';
import { BasicAuthModule } from 'backend/BasicLogin/BasicAuthModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { GoogleLoginModule } from 'backend/GoogleLogin/GoogleLoginModule';
import { RegisterModule } from 'backend/Register/RegisterModule';
import { ForgotPasswordModule } from 'backend/ForgotPassword/ForgotPasswordModule';
import { RoleModule } from 'backend/Role/RoleModule';
import { ConfigModule } from 'backend/Config/ConfigModule';
import { LogoutModule } from 'backend/Logout/LogoutModule';

@Module({
  imports: [
    ConfigModule,
    CommonModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        statusResolver: configGetter.statusResolver,
        translations: configGetter.getTranslations(),
        logger: configGetter.getLoggerOptions(),
        sessionCookieDomain: configGetter.getCookieDomain(),
        apiPrefix: configGetter.getApiPrefix(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    GoogleLoginModule,
    RegisterModule,
    BasicAuthModule,
    AuthModule,
    MailerModule.forRootAsync({
      inject: [ConfigGetter, EnvGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        transport: configGetter.getMailerTransport(),
        defaults: {
          from: `"${configGetter.getRootDomain()}" <${configGetter.getMailerFrom()}>`,
        },
      }),
    }),
    GoogleRecaptchaModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getRecaptchaOptions(),
    }),
    ForgotPasswordModule,
    RoleModule,
    LogoutModule,
  ],
})
export class AppModule {}
