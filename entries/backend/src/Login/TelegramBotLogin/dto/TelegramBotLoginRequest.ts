import { ApiProperty } from '@nestjs/swagger';

export class TelegramBotLoginRequest {
  /**
   * Телефон.
   */
  @ApiProperty()
  public phone!: string;

  /**
   * Id телеграм.
   */
  @ApiProperty()
  public id!: number;

  /**
   * Имя.
   */
  @ApiProperty()
  public firstName?: string;

  /**
   * Фамилия.
   */
  @ApiProperty()
  public lastName?: string;
}
