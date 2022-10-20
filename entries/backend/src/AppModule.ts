import { CommonModule, EnvGetter } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import { MailerModule } from '@nestjs-modules/mailer';

import { AuthModule } from 'backend/Auth/AuthModule';
import { EmailLoginModule } from 'backend/Login/EmailLogin/EmailLoginModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { GoogleLoginModule } from 'backend/Login/GoogleLogin/GoogleLoginModule';
import { RoleModule } from 'backend/Role/RoleModule';
import { ConfigModule } from 'backend/Config/ConfigModule';
import { LogoutModule } from 'backend/Logout/LogoutModule';
import { PhoneLoginModule } from 'backend/Login/PhoneLogin/PhoneLoginModule';
import { TelegramLoginModule } from 'backend/Login/TelegramLogin/TelegramLoginModule';
import { FrontendSettingsModule } from 'backend/FrontendSettings/FrontendSettingsModule';
import { SendForgotPasswordCodeEmailModule } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodeEmail/SendForgotPasswordCodeEmailModule';
import { SendForgotPasswordCodePhoneModule } from 'backend/SendForgotPasswordCode/SendForgotPasswordCodePhone/SendForgotPasswordCodeEmailModule';
import { ChangePasswordPhoneModule } from 'backend/ChangePassword/ChangePasswordPhone/ChangePasswordPhoneModule';
import { ChangePasswordEmailModule } from 'backend/ChangePassword/ChangePasswordEmail/ChangePasswordEmailModule';
import { EmailRegisterModule } from 'backend/Register/EmailRegister/EmailRegisterModule';
import { PhoneRegisterModule } from 'backend/Register/PhoneRegister/PhoneRegisterModule';
import { TelegramBotLoginModule } from 'backend/Login/TelegramBotLogin/TelegramBotLoginModule';

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
    EmailLoginModule,
    AuthModule,
    SendForgotPasswordCodeEmailModule,
    SendForgotPasswordCodePhoneModule,
    ChangePasswordEmailModule,
    ChangePasswordPhoneModule,
    EmailRegisterModule,
    PhoneRegisterModule,
    RoleModule,
    LogoutModule,
    PhoneLoginModule,
    TelegramLoginModule,
    FrontendSettingsModule,
    TelegramBotLoginModule,
  ],
})
export class AppModule {}
