import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ConfirmEmailRequest {
  /**
   * Код подтверждения.
   */
  @ApiProperty()
  @Length(4, 4, {
    message: i18nValidationMessage('lengthEqual'),
  })
  public confirmCode!: string;

  /**
   * Email.
   */
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('incorrectEmailFormat'),
    },
  )
  public email!: string;
}
