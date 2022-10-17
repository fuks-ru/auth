import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SendForgotPasswordCodePhoneRequest {
  /**
   * Телефон.
   */
  @ApiProperty()
  @IsPhoneNumber('RU', {
    message: i18nValidationMessage('incorrectPhoneFormat'),
  })
  public phone!: string;
}
