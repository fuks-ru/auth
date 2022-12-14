import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { differenceInSeconds } from 'date-fns';
import { Injectable } from '@nestjs/common';

import { ForgotPasswordCode } from 'backend/ForgotPasswordCode/entities/ForgotPasswordCode';
import { User } from 'backend/User/entities/User';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class ForgotPasswordCodeService {
  public constructor(
    @InjectRepository(ForgotPasswordCode)
    private readonly forgotPasswordCodeRepository: Repository<ForgotPasswordCode>,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Добавляет код подтверждения в БД. Или обновляет, если он уже существует.
   */
  public async addForgotPasswordCodeToUser(
    user: User,
  ): Promise<ForgotPasswordCode> {
    const existCode = await this.forgotPasswordCodeRepository.findOneBy({
      user: {
        id: user.id,
      },
    });

    const newValue = this.generateCode();

    if (!existCode) {
      const forgotPasswordCode = new ForgotPasswordCode();

      forgotPasswordCode.value = newValue;
      forgotPasswordCode.user = user;

      return this.forgotPasswordCodeRepository.save(forgotPasswordCode);
    }

    const lastUpdatedAtDifference = differenceInSeconds(
      new Date(),
      existCode.updatedAt,
    );

    if (lastUpdatedAtDifference < 60) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.FORGOT_PASSWORD_CODE_TIMEOUT,
        i18n.t('beforeResending', {
          args: {
            seconds: 60 - lastUpdatedAtDifference,
          },
        }),
      );
    }

    existCode.value = newValue;

    return this.forgotPasswordCodeRepository.save(existCode);
  }

  /**
   * Получает код по его значению.
   */
  public async getByValueAndEmail(
    email: string,
    value: string,
  ): Promise<ForgotPasswordCode> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeRepository.findOneBy({
        value,
        user: {
          email,
        },
      });

    if (!forgotPasswordCode) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.FORGOT_PASSWORD_NOT_EXIST,
        i18n.t('forgotPasswordCodeNotExist'),
      );
    }

    return forgotPasswordCode;
  }

  /**
   * Получает код по его значению.
   */
  public async getByValueAndPhone(
    phone: string,
    value: string,
  ): Promise<ForgotPasswordCode> {
    const forgotPasswordCode =
      await this.forgotPasswordCodeRepository.findOneBy({
        value,
        user: {
          phone,
        },
      });

    if (!forgotPasswordCode) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.FORGOT_PASSWORD_NOT_EXIST,
        i18n.t('forgotPasswordCodeNotExist'),
      );
    }

    return forgotPasswordCode;
  }

  /**
   * Удаляет код по ID.
   */
  public async removeById(id: string): Promise<void> {
    await this.forgotPasswordCodeRepository.delete({
      id,
    });
  }

  private generateCode(): string {
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
