import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { FrontendSettingsResponse } from 'backend/FrontendSettings/dto/FrontendSettingsResponse';

@Controller('/frontend-settings')
@ApiTags('Auth')
export class FrontendSettingsController {
  public constructor(private readonly configGetter: ConfigGetter) {}

  /**
   * Возвращает конфиги для фронта.
   */
  @ApiOperation({
    operationId: 'frontendSettingsGet',
  })
  @ApiOkResponse({
    type: FrontendSettingsResponse,
  })
  @Get()
  public get(): FrontendSettingsResponse {
    return {
      telegramBotName: this.configGetter.getTelegramBotName(),
    };
  }
}
