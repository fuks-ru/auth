import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendConfirmRequest {
  /**
   * Email для отправки кода подтверждения.
   */
  @IsEmail()
  @ApiProperty()
  public email!: string;
}
