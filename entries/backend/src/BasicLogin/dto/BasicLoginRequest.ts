import { ApiProperty } from '@nestjs/swagger';

export class BasicLoginRequest {
  /**
   * Email.
   */
  @ApiProperty()
  public email!: string;

  /**
   * Пароль.
   */
  @ApiProperty()
  public password!: string;
}
