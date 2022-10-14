import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ConfirmRequest {
  /**
   * Код подтверждения.
   */
  @ApiProperty()
  @Length(4, 4, {
    message: i18nValidationMessage('lengthEqual'),
  })
  public confirmCode!: string;

  /**
   * Телефон.
   */
  @ApiProperty()
  @IsPhoneNumber('RU', {
    message: i18nValidationMessage('incorrectPhoneFormat'),
  })
  public phone!: string;
}
