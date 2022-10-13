import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, MinLength, ValidateIf } from 'class-validator';
import { Match } from '@fuks-ru/common-backend';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PhoneRegisterRequest {
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
    (o: Partial<PhoneRegisterRequest>) =>
      !!o.password && o.password.length >= 8,
  )
  @Match('password', {
    message: i18nValidationMessage('passwordEqual'),
  })
  public repeatPassword!: string;
}
