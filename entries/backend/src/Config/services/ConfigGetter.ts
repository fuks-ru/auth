import { EnvGetter, ICommonModuleOptions } from '@fuks-ru/common-backend';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';
import { Request } from 'express';
import * as path from 'node:path';

import { ormConfig } from 'backend/Config/utils/ormconfig';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import enUs from 'backend/__i18n__/en-US.json';
import ruRU from 'backend/__i18n__/ru-RU.json';

interface IRequest extends Request {
  headers: {
    recaptcha?: string;
  };
}

interface IZadarmaOptions {
  apiUserKey: string;
  apiSecretKey: string;
  callerId: string;
}

@Injectable()
export class ConfigGetter {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  public readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.GOOGLE_AUTH_PAYLOAD_EMPTY]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.GOOGLE_AUTH_EMAIL_NOT_FOUND]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.USER_ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [ErrorCode.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCode.CONFIRM_CODE_NOT_EXIST]: HttpStatus.NOT_FOUND,
    [ErrorCode.CONFIRM_CODE_TIMEOUT]: HttpStatus.TOO_MANY_REQUESTS,
    [ErrorCode.FORGOT_PASSWORD_NOT_EXIST]: HttpStatus.NOT_FOUND,
    [ErrorCode.FORGOT_PASSWORD_CODE_TIMEOUT]: HttpStatus.TOO_MANY_REQUESTS,
    [ErrorCode.USER_INCORRECT_EMAIL_OR_PASSWORD]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.USER_INCORRECT_PHONE_OR_PASSWORD]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.CONFIRM_CODE_PHONE_EMPTY]: HttpStatus.UNPROCESSABLE_ENTITY,
    [ErrorCode.TELEGRAM_HASH_NOT_VALID]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.INTERNAL_REQUEST_TOKEN_NOT_VALID]: HttpStatus.BAD_REQUEST,
  };

  public constructor(private readonly envGetter: EnvGetter) {}

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return 3_003;
  }

  /**
   * Получает префикс API.
   */
  public getApiPrefix(): string {
    return '/api';
  }

  /**
   * Возвращает конфиг для подключения к БД.
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.envGetter.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
  }

  /**
   * Получает jwt секрет.
   */
  public getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.envGetter.isDev()
        ? 'dev-jwt-secret'
        : this.envGetter.getEnv('JWT_SECRET'),
    };
  }

  /**
   * Получает clientId для Google-авторизации.
   */
  public getGoogleClientId(): string {
    return this.envGetter.isDev()
      ? '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com'
      : this.envGetter.getEnv('GOOGLE_AUTH_CLIENT_ID');
  }

  /**
   * Конфиг для отправки почты.
   */
  public getMailerTransport(): TransportType {
    return this.envGetter.isDev()
      ? {
          host: 'mail.fuks.ru',
          port: 465,
          secure: true,
          auth: {
            user: this.getMailerFrom(),
            pass: 'test-mailer',
          },
        }
      : {
          host: this.envGetter.getEnv('MAILER_HOST'),
          port: 465,
          secure: true,
          auth: {
            user: this.getMailerFrom(),
            pass: this.envGetter.getEnv('MAILER_PASSWORD'),
          },
        };
  }

  /**
   * Email для отправки почты.
   */
  public getMailerFrom(): string {
    return this.envGetter.isDev()
      ? 'test@fuks.ru'
      : this.envGetter.getEnv('MAILER_USER');
  }

  /**
   * Конфиг для Google Recaptcha.
   */
  public getRecaptchaOptions(): GoogleRecaptchaModuleOptions {
    return this.envGetter.isDev()
      ? {
          secretKey: '6Lel8ZcgAAAAANztX82p5f1bqQocGi1aUw_YgjTn',
          response: (request: IRequest) => request.headers.recaptcha || '',
          score: 0.8,
        }
      : {
          secretKey: this.envGetter.getEnv('GOOGLE_RECAPTCHA_SECRET_KEY'),
          response: (request: IRequest) => request.headers.recaptcha || '',
          score: 0.8,
        };
  }

  /**
   * Возвращает переводы.
   */
  public getTranslations(): ICommonModuleOptions['translations'] {
    return {
      'en-US': enUs,
      'ru-RU': ruRU,
    };
  }

  /**
   * Получает конфиг для логгера.
   */
  public getLoggerOptions(): ICommonModuleOptions['logger'] {
    return {
      isToConsoleDisable: false,
      isToFileDisable: false,
    };
  }

  /**
   * Получает корневой домен.
   */
  public getRootDomain(): string {
    return this.envGetter.isDev()
      ? 'localhost'
      : this.envGetter.getEnv('DOMAIN');
  }

  /**
   * Получает домен для установки кук.
   */
  public getCookieDomain(): string {
    return this.envGetter.isDev()
      ? 'localhost'
      : `.${this.envGetter.getEnv('DOMAIN')}`;
  }

  /**
   * Получает домен фронта авторизации со схемой.
   */
  public getAuthDomainWithScheme(): string {
    return this.envGetter.isDev()
      ? 'http://localhost:3002'
      : `https://auth.${this.envGetter.getEnv('DOMAIN')}`;
  }

  /**
   * Получает домены админок со схемой.
   */
  public getAdminDomainsWithScheme(): string[] {
    return this.envGetter.isDev()
      ? ['http://localhost:3000']
      : [`https://admin.${this.envGetter.getEnv('DOMAIN')}`];
  }

  /**
   * Получает токен телеграм бота.
   */
  public getTelegramBotToken(): string {
    return this.envGetter.isDev()
      ? ''
      : this.envGetter.getEnv('TELEGRAM_BOT_TOKEN');
  }

  /**
   * Получает конфиг для звонков.
   */
  public getZadarmaOptions(): IZadarmaOptions {
    return this.envGetter.isDev()
      ? {
          apiSecretKey: '',
          apiUserKey: '',
          callerId: '',
        }
      : {
          apiSecretKey: this.envGetter.getEnv('ZADARMA_SECRET_KEY'),
          apiUserKey: this.envGetter.getEnv('ZADARMA_USER_KEY'),
          callerId: this.envGetter.getEnv('ZADARMA_CALLER_ID'),
        };
  }

  /**
   * Получает токен телеграм бота.
   */
  public getTelegramBotName(): string {
    return this.envGetter.isDev()
      ? ''
      : this.envGetter.getEnv('TELEGRAM_BOT_NAME');
  }

  /**
   * Получает токен для внутренних запросов между сервисами.
   */
  public getInternalRequestToken(): string {
    return this.envGetter.isDev()
      ? ''
      : this.envGetter.getEnv('INTERNAL_REQUEST_TOKEN');
  }

  private getProdTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      ...ormConfig,
      autoLoadEntities: true,
    };
  }

  private getDevTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: path.join(process.cwd(), './var/auth-sqlite'),
      synchronize: true,
      entities: ['**/entities/**/*.ts'],
      autoLoadEntities: true,
    };
  }
}
