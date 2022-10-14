import { ApiProperty } from '@nestjs/swagger';

export class PhoneLoginRequest {
  /**
   * Телефон.
   */
  @ApiProperty()
  public phone!: string;

  /**
   * Пароль.
   */
  @ApiProperty()
  public password!: string;
}
