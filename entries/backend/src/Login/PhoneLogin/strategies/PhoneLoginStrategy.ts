import {
  I18nResolver,
  SystemErrorFactory,
  ValidationErrorFactory,
} from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';
import { isPhoneNumber } from 'class-validator';

import { User } from 'backend/User/entities/User';
import { PhoneLoginService } from 'backend/Login/PhoneLogin/services/PhoneLoginService';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { PhoneLoginRequest } from 'backend/Login/PhoneLogin/dto/PhoneLoginRequest';

interface IRequest extends ExpressRequest {
  body: PhoneLoginRequest;
}

@Injectable()
export class PhoneLoginStrategy extends PassportStrategy(
  Strategy,
  'login-phone',
) {
  public constructor(
    private readonly phoneLoginService: PhoneLoginService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly validationErrorFactory: ValidationErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {
    super();
  }

  /**
   * Валидация по телефону и паролю.
   */
  public async validate(request: IRequest): Promise<User> {
    const i18n = this.i18nResolver.resolve();

    const phoneErrors: string[] = [];
    const passwordErrors: string[] = [];

    const { body } = request;

    if (!body.phone) {
      phoneErrors.push(i18n.t('enterPhone'));
    }

    if (body.phone && !isPhoneNumber(body.phone, 'RU')) {
      phoneErrors.push(i18n.t('incorrectPhoneFormat'));
    }

    if (!body.password) {
      passwordErrors.push(i18n.t('enterPassword'));
    }

    if (phoneErrors.length > 0 || passwordErrors.length > 0) {
      throw this.validationErrorFactory.createFromData({
        phone: phoneErrors,
        password: passwordErrors,
      });
    }

    const user = await this.phoneLoginService.validateUser(
      body.phone,
      body.password,
    );

    if (!user) {
      throw this.systemErrorFactory.create(
        ErrorCode.USER_INCORRECT_PHONE_OR_PASSWORD,
        i18n.t('incorrectPhoneOrPassword'),
      );
    }

    return user;
  }
}
