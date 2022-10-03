import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  I18nResolver,
  SystemError,
  SystemErrorFactory,
} from '@fuks-ru/common-backend';
import { CommonErrorCode } from '@fuks-ru/common';

import { UserVerifyRequest } from 'backend/Auth/dto/UserVerifyRequest';
import { UserVerifyResponse } from 'backend/Auth/dto/UserVerifyResponse';
import { IJwtPayload } from 'backend/Login/dto/IJwtPayload';
import { UserService } from 'backend/User/services/UserService';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Проверяет токен и возвращает пользователя.
   */
  public async verify(
    userVerifyRequest: UserVerifyRequest,
  ): Promise<UserVerifyResponse> {
    const payload = this.jwtService.verify<IJwtPayload>(
      userVerifyRequest.jwtToken,
    );

    try {
      const { hashedPassword, ...user } =
        await this.userService.getConfirmedById(payload.id);

      return user;
    } catch (error) {
      const i18n = await this.i18nResolver.resolve();

      if (
        error instanceof SystemError &&
        error.code === ErrorCode.USER_NOT_FOUND
      ) {
        throw this.systemErrorFactory.create(
          CommonErrorCode.FORBIDDEN,
          i18n.t('forbidden'),
        );
      }

      throw error;
    }
  }
}
