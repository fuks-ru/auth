import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { IRequest } from 'backend/Auth/types/IRequest';
import { IJwtPayload } from 'backend/SetJwtCookie/dto/IJwtPayload';
import { UserService } from 'backend/User/services/UserService';

@Injectable()
export class CheckNotAuth {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * Проверяет, является ли пользователь неавторизованным.
   */
  public async check(request: IRequest): Promise<boolean> {
    const { jwtToken } = request.cookies;

    if (!jwtToken) {
      return true;
    }

    const payload = this.jwtService.verify<IJwtPayload>(jwtToken);

    if (!payload.id) {
      return true;
    }

    const user = await this.userService.findById(payload.id);

    return !user;
  }
}
