import {
  SystemError,
  I18nResolver,
  SystemErrorFactory,
} from '@fuks-ru/common-backend';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { ConfirmCode } from 'backend/ConfirmCode/entities/ConfirmCode';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { User } from 'backend/User/entities/User';
import { ForgotPasswordCode } from 'backend/ForgotPasswordCode/entities/ForgotPasswordCode';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Добавляет пользователя, если он не существует. Или обновляет, если не
   * подтвержден.
   */
  public async addUserIfNotConfirmed(user: User): Promise<User> {
    let existUser: User | null = null;

    if (user.email) {
      existUser = await this.findByEmail(user.email);
    }

    if (!user.email && user.phone) {
      existUser = await this.findByPhone(user.phone);
    }

    if (existUser?.isConfirmed) {
      const i18n = await this.i18nResolver.resolve();

      throw this.systemErrorFactory.create(
        ErrorCode.USER_ALREADY_EXISTS,
        i18n.t('userAlreadyExists'),
      );
    }

    if (existUser && !existUser.isConfirmed) {
      existUser.hashedPassword = user.hashedPassword;
      existUser.isConfirmed = user.isConfirmed;

      return this.addOrUpdateUser({
        ...existUser,
      });
    }

    return this.addOrUpdateUser(user);
  }

  /**
   * Добавляет или обновляет пользователя в БД.
   */
  public addOrUpdateUser(user: DeepPartial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  /**
   * Удаляет пользователя в БД по id.
   */
  public async deleteById(id: string): Promise<void> {
    await this.userRepository.delete({
      id,
    });
  }

  /**
   * Ищет подтвержденного пользователя по email.
   */
  public async findConfirmedByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
      isConfirmed: true,
    });
  }

  /**
   * Ищет подтвержденного пользователя по email.
   */
  public async findConfirmedByTelegramId(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({
      telegramId: id,
      isConfirmed: true,
    });
  }

  /**
   * Ищет подтвержденного пользователя по телефону.
   */
  public async findConfirmedByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      phone,
      isConfirmed: true,
    });
  }

  /**
   * Ищет пользователя по email.
   */
  public async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  /**
   * Ищет пользователя по телефону.
   */
  public async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      phone,
    });
  }

  /**
   * Получает пользователя по id.
   */
  public async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Ищет пользователя по id.
   */
  public findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      id,
    });
  }

  /**
   * Ищет подтвержденного пользователя по id.
   */
  public findConfirmedById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({
      id,
      isConfirmed: true,
    });
  }

  /**
   * Получает неподтвержденного пользователя по email.
   */
  public async getUnConfirmedByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
      isConfirmed: false,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Получает неподтвержденного пользователя по телефону.
   */
  public async getUnConfirmedByPhone(phone: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      phone,
      isConfirmed: false,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Получает подтвержденного пользователя по email.
   */
  public async getConfirmedByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
      isConfirmed: true,
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    return user;
  }

  /**
   * Подтверждает email пользователя по коду подтверждения.
   */
  public async confirmEmailByConfirmCode(
    confirmCode: ConfirmCode,
    email: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({
      confirmCode: {
        id: confirmCode.id,
      },
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    user.isConfirmed = true;
    user.email = email;

    return this.userRepository.save(user);
  }

  /**
   * Подтверждает пользователя по телефону.
   */
  public async confirmUser(confirmCode: ConfirmCode): Promise<User> {
    const user = await this.userRepository.findOneBy({
      confirmCode: {
        id: confirmCode.id,
      },
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    user.isConfirmed = true;

    return this.userRepository.save(user);
  }

  /**
   * Изменяет телефон пользователя.
   */
  public async changePhone(user: User, phone: string): Promise<User> {
    return this.userRepository.save({
      ...user,
      phone,
    });
  }

  /**
   * Изменяет email пользователя.
   */
  public async changeEmail(user: User, email: string): Promise<User> {
    return this.userRepository.save({
      ...user,
      email,
    });
  }

  /**
   * Меняет пароль пользователя по коду смены пароля.
   */
  public async changePasswordByForgotPasswordCode(
    forgotPassword: ForgotPasswordCode,
    hashedPassword: string,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({
      forgotPassword: {
        id: forgotPassword.id,
      },
    });

    if (!user) {
      throw await this.getNotFoundError();
    }

    user.hashedPassword = hashedPassword;

    return this.userRepository.save(user);
  }

  /**
   * Получает список всех пользователей.
   */
  public async getList(): Promise<User[]> {
    return this.userRepository.find();
  }

  private async getNotFoundError(): Promise<SystemError> {
    const i18n = await this.i18nResolver.resolve();

    return this.systemErrorFactory.create(
      ErrorCode.USER_NOT_FOUND,
      i18n.t('userNotFound'),
    );
  }
}
