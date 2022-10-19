import Buffer from 'node:buffer';
import { createHash, createHmac } from 'node:crypto';
import { I18nResolver, ValidationErrorFactory } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { LinkTelegramRequest } from 'backend/LinkTelegram/dto/LinkTelegramRequest';

@Injectable()
export class LinkTelegramService {
  private readonly secret: Buffer;

  public constructor(
    private readonly i18nResolver: I18nResolver,
    private readonly configGetter: ConfigGetter,
    private readonly validationErrorFactory: ValidationErrorFactory,
  ) {
    this.secret = createHash('sha256')
      .update(configGetter.getTelegramBotToken())
      .digest();
  }

  /**
   * Валидация по token.
   */
  public async validate({
    hash,
    ...data
  }: LinkTelegramRequest): Promise<boolean> {
    if (!hash) {
      const i18n = await this.i18nResolver.resolve();

      throw await this.validationErrorFactory.createFromData({
        accessToken: [i18n.t('emptyToken')],
      });
    }

    const hmac = createHmac('sha256', this.secret);

    const checkString = Object.keys(data)
      .sort()
      .map((k) => `${k}=${data[k as keyof typeof data] as string}`)
      .join('\n');

    const checkedHmac = hmac.update(checkString).digest('hex');

    return checkedHmac === hash;
  }
}
