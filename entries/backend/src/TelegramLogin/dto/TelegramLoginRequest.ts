import { ApiProperty } from '@nestjs/swagger';

export class TelegramLoginRequest {
  /**
   * Токен для авторизации.
   */
  @ApiProperty()
  public hash!: string;

  /**
   * ID в телеграм.
   */
  @ApiProperty()
  public id!: number;

  /**
   * Имя.
   */
  @ApiProperty()
  public first_name?: string;

  /**
   * Имя.
   */
  @ApiProperty()
  public last_name?: string;
}
