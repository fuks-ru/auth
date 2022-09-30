import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class ResendConfirmRequest {
  /**
   * Email для отправки кода подтверждения.
   */
  @IsEmail()
  @ApiProperty()
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
