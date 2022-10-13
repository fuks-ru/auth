import { SMSRu } from 'node-sms-ru';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsSenderService {
  private readonly smsRu = new SMSRu('FEC2BD02-34A6-A469-101E-A7B4C38FDB0A');

  /**
   * Отправляет sms.
   */
  public async send(to: string, text: string): Promise<void> {
    const response = await this.smsRu.sendSms({
      to,
      msg: text,
    });

    console.log(response);
  }
}
