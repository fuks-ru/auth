import { ApiProperty } from '@nestjs/swagger';

export class FrontendSettingsResponse {
  /**
   * Имя телеграм бота .
   */
  @ApiProperty()
  public telegramBotName!: string;
}
