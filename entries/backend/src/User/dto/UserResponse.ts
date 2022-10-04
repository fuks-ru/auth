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
  @ApiProperty()
  public email!: string;

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
