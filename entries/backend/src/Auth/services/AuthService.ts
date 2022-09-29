import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserVerifyRequest } from 'backend/Auth/dto/UserVerifyRequest';
import { UserVerifyResponse } from 'backend/Auth/dto/UserVerifyResponse';
import { IJwtPayload } from 'backend/Login/dto/IJwtPayload';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

    const { hashedPassword, ...user } = await this.userService.getConfirmedById(
      payload.id,
    );

    return user;
  }
}
