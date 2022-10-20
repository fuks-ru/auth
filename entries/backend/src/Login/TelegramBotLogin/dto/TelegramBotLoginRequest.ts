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
    required: true,
  })
  public firstName?: string;

  /**
   * Фамилия.
   */
  @ApiProperty({
    required: true,
  })
  public lastName?: string;
}
