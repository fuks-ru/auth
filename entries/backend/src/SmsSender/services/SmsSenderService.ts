import { Injectable } from '@nestjs/common';
import { api } from 'zadarma';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

@Injectable()
export class SmsSenderService {
  public constructor(private readonly configGetter: ConfigGetter) {}

  /**
   * Отправляет sms.
   */
  public async send(to: string, text: string): Promise<void> {
    const options = this.configGetter.getZadarmaOptions();

    await api({
      api_method: '/v1/request/checknumber/',
      api_user_key: options.apiUserKey,
      api_secret_key: options.apiSecretKey,
      params: {
        caller_id: options.callerId,
        to,
        code: text,
        lang: 'ru',
      },
    });
  }
}
