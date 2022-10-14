import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'backend/User/entities/User';

export class UserResponse {
  /**
   * Id.
   */
  @ApiProperty()
  public id!: string;

  /**
   * Email.
   */
  @ApiProperty({
    required: false,
  })
  public email?: string;

  /**
   * Телефон.
   */
  @ApiProperty({
    required: false,
  })
  public phone?: string;

  /**
   * Id в телеграм.
   */
  @ApiProperty({
    required: false,
  })
  public telegramId?: number;

  /**
   * Имя.
   */
  @ApiProperty({
    required: false,
  })
  public firstName?: string;

  /**
   * Фамилия.
   */
  @ApiProperty({
    required: false,
  })
  public lastName?: string;

  /**
   * Роль.
   */
  @ApiProperty()
  public role!: Role;

  /**
   * Подтвержден ли пользователь по email.
   */
  @ApiProperty()
  public isConfirmed!: boolean;
}
