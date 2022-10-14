import { CommonModule, EnvGetter } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { MailerModule } from '@nestjs-modules/mailer';

import { AuthModule } from 'backend/Auth/AuthModule';
import { EmailLoginModule } from 'backend/EmailLogin/EmailLoginModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { GoogleLoginModule } from 'backend/GoogleLogin/GoogleLoginModule';
import { RegisterModule } from 'backend/Register/RegisterModule';
import { ForgotPasswordModule } from 'backend/ForgotPassword/ForgotPasswordModule';
import { RoleModule } from 'backend/Role/RoleModule';
import { ConfigModule } from 'backend/Config/ConfigModule';
import { LogoutModule } from 'backend/Logout/LogoutModule';
import { PhoneLoginModule } from 'backend/PhoneLogin/PhoneLoginModule';
import { TelegramLoginModule } from 'backend/TelegramLogin/TelegramLoginModule';
import { FrontendSettingsModule } from 'backend/FrontendSettings/FrontendSettingsModule';

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
        swagger: {
          generators: ['axios'],
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
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
    GoogleLoginModule,
    RegisterModule,
    EmailLoginModule,
    AuthModule,
    ForgotPasswordModule,
    RoleModule,
    LogoutModule,
    PhoneLoginModule,
    TelegramLoginModule,
    FrontendSettingsModule,
  ],
})
export class AppModule {}
