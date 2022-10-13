import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ResendConfirmEmailRequest {
  /**
   * Email для отправки кода подтверждения.
   */
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('incorrectEmailFormat'),
    },
  )
  @ApiProperty()
  public email!: string;
}
