import { ApiProperty } from '@nestjs/swagger';

export class EmailLoginRequest {
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
