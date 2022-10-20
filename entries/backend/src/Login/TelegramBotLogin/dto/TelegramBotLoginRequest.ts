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
  @ApiProperty({
    required: false,
  })
  public firstName?: string;

  /**
   * Фамилия.
   */
  @ApiProperty({
    required: false,
  })
  public lastName?: string;
}
