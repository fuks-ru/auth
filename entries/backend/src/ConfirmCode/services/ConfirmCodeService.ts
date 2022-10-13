import { SystemErrorFactory, I18nResolver } from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { differenceInSeconds } from 'date-fns';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { User } from 'backend/User/entities/User';
import { ConfirmCode } from 'backend/ConfirmCode/entities/ConfirmCode';

@Injectable()
export class ConfirmCodeService {
  public constructor(
    @InjectRepository(ConfirmCode)
    private readonly confirmCodeRepository: Repository<ConfirmCode>,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Добавляет код подтверждения в БД. Или обновляет, если он уже существует.
   */
  public async addConfirmCodeToUser(user: User): Promise<ConfirmCode> {
    const existCode = await this.confirmCodeRepository.findOneBy({
      user: {
        id: user.id,
      },
    });

    const newValue = this.generateConfirmCode();

    if (!existCode) {
      const confirmCode = new ConfirmCode();

      confirmCode.value = newValue;
      confirmCode.user = user;

      return this.confirmCodeRepository.save(confirmCode);
    }

    const lastUpdatedAtDifference = differenceInSeconds(
      new Date(),
      existCode.updatedAt,
    );

    if (lastUpdatedAtDifference < 60) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_TIMEOUT,
        i18n.t('beforeResending', {
          args: {
            seconds: 60 - lastUpdatedAtDifference,
          },
        }),
      );
    }

    existCode.value = newValue;

    return this.confirmCodeRepository.save(existCode);
  }

  /**
   * Получает код по его значению.
   */
  public async getByValueAndEmail(
    value: string,
    email: string,
  ): Promise<ConfirmCode> {
    const confirmCode = await this.confirmCodeRepository.findOneBy({
      value,
      user: {
        email,
      },
    });

    if (!confirmCode) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_NOT_EXIST,
        i18n.t('confirmationCodeNotExist'),
      );
    }

    return confirmCode;
  }

  /**
   * Получает код по его значению.
   */
  public async getByValueAndPhone(
    value: string,
    phone: string,
  ): Promise<ConfirmCode> {
    const confirmCode = await this.confirmCodeRepository.findOneBy({
      value,
      user: {
        phone,
      },
    });

    if (!confirmCode) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.CONFIRM_CODE_NOT_EXIST,
        i18n.t('confirmationCodeNotExist'),
      );
    }

    return confirmCode;
  }

  /**
   * Удаляет код по ID.
   */
  public async removeById(id: string): Promise<void> {
    await this.confirmCodeRepository.delete({
      id,
    });
  }

  private generateConfirmCode(): string {
    const generateSymbol = (): string =>
      Math.floor(Math.random() * 10).toString();

    return [
      generateSymbol(),
      generateSymbol(),
      generateSymbol(),
      generateSymbol(),
    ].join('');
  }
}
