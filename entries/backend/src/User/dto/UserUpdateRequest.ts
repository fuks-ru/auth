import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

import { Role } from 'backend/User/entities/User';

export class UserUpdateRequest {
  /**
   * Роль.
   */
  @ApiProperty()
  @IsEnum(Role, {
    message: i18nValidationMessage('incorrectRole'),
  })
  public role!: Role;

  /**
   * Имя.
   */
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public firstName?: string;

  /**
   * Фамилия.
   */
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public lastName?: string;

  /**
   * Подтвержден ли пользователь.
   */
  @ApiProperty()
  @IsOptional()
  @IsBoolean({
    message: i18nValidationMessage('mustBeBoolean'),
  })
  public isConfirmed!: boolean;
}
