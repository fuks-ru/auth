import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ForgotPasswordRequest {
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

  /**
   * Путь для перенаправления.
   */
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  public redirectFrom?: string;
}
