import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ForgotPasswordEmailRequest {
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
