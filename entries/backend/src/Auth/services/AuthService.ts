import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IJwtPayload } from 'backend/SetJwtCookie/dto/IJwtPayload';
import { UserService } from 'backend/User/services/UserService';
import { IRequest } from 'backend/Auth/types/IRequest';
import { User } from 'backend/User/entities/User';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Проверяет токен и возвращает пользователя.
   */
  public async verify(request: IRequest): Promise<User | null> {
    const { jwtToken } = request.cookies;

    if (!jwtToken) {
      return null;
    }

    const payload = this.jwtService.verify<IJwtPayload>(jwtToken);

    if (!payload.id) {
      return null;
    }

    const user = await this.userService.findConfirmedById(payload.id);

    if (!user) {
      return null;
    }

    return user;
  }
}
