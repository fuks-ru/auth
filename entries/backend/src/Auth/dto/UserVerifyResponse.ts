import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'backend/User/entities/User';

export class UserVerifyResponse {
  /**
   * ID.
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
   * Id в телеграм.
   */
  @ApiProperty({
    required: false,
  })
  public telegramId?: number;

  /**
   * Роль.
   */
  @ApiProperty({
    enum: Role,
  })
  public role!: Role;
}
