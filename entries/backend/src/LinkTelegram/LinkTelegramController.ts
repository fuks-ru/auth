import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';

import { LinkTelegramService } from 'backend/LinkTelegram/LinkTelegramService';
import { User } from 'backend/Auth/decorators/User';
import { User as UserEntity } from 'backend/User/entities/User';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { UserService } from 'backend/User/services/UserService';
import { LinkTelegramRequest } from 'backend/LinkTelegram/dto/LinkTelegramRequest';

@Controller('/link-telegram')
@ApiTags('LingTelegram')
export class LinkTelegramController {
  public constructor(
    private readonly linkTelegramService: LinkTelegramService,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
    private readonly userService: UserService,
  ) {}

  /**
   * Маршрут для авторизации.
   */
  @Post('/link-telegram')
  @ApiOperation({
    operationId: 'linkTelegram',
  })
  public async link(
    @User() user: UserEntity,
    @Body() body: LinkTelegramRequest,
  ): Promise<void> {
    const isValid = await this.linkTelegramService.validate(body);

    if (!isValid) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.TELEGRAM_HASH_NOT_VALID,
        i18n.t('telegramHashNotValid'),
      );
    }

    const userWithThisTelegramId =
      await this.userService.findConfirmedByTelegramId(body.id);

    if (userWithThisTelegramId) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.USER_ALREADY_EXISTS,
        i18n.t('userAlreadyExists'),
      );
    }

    await this.userService.addOrUpdateUser({
      ...user,
      telegramId: body.id,
      firstName: user.firstName || body.first_name,
      lastName: user.lastName || body.last_name,
    });
  }
}
