import { Match } from '@fuks-ru/common-backend';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ChangePasswordPhoneRequest {
  /**
   * Код восстановления пароля.
   */
  @IsString({
    message: i18nValidationMessage('incorrectForgotPasswordCode'),
  })
  public forgotPasswordCode!: string;

  /**
   * Телефон.
   */
  @ApiProperty()
  @IsPhoneNumber('RU', {
    message: i18nValidationMessage('incorrectPhoneFormat'),
  })
  public phone!: string;

  /**
   * Пароль.
   */
  @ApiProperty()
  @MinLength(8, {
    message: i18nValidationMessage('minLength'),
  })
  public password!: string;

  /**
   * Повтор пароля.
   */
  @ApiProperty()
  @ValidateIf(
    (o: Partial<ChangePasswordPhoneRequest>) =>
      !!o.password && o.password.length >= 8,
  )
  @Match('password', {
    message: i18nValidationMessage('passwordEqual'),
  })
  public repeatPassword!: string;
}
