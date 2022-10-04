import { ICommonModuleOptions } from '@fuks-ru/common-backend';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';
import cookieParser from 'cookie-parser';

import { IMockedUser, UsersBuilder } from 'backend/__e2e__/dsl/UsersBuilder';
import { AppModule } from 'backend/AppModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

export class AppBuilder {
  private readonly usersBuilder = new UsersBuilder();

  private readonly config: typeof ConfigGetter = class extends ConfigGetter {
    /**
     * Выключает логирование в консоль и файлы во время тестов.
     */
    public override getLoggerOptions(): ICommonModuleOptions['logger'] {
      return {
        isToConsoleDisable: true,
        isToFileDisable: false,
      };
    }

    /**
     * Возвращает тестовый конфиг для подключения к БД.
     */
    public override getTypeOrmConfig(): TypeOrmModuleOptions {
      return {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: ['**/entities/**/*.ts'],
        autoLoadEntities: true,
      };
    }

    /**
     * Выключает проверку рекапчи.
     */
    public override getRecaptchaOptions(): GoogleRecaptchaModuleOptions {
      return {
        ...super.getRecaptchaOptions(),
        skipIf: true,
      };
    }
  };

  /**
   * Получает инстанс билдера.
   */
  public static app = (): AppBuilder => new AppBuilder();

  /**
   * Добавляет пользователя в БД.
   */
  public withUser(user: IMockedUser): AppBuilder {
    this.usersBuilder.addUser(user);

    return this;
  }

  /**
   * Получает Nest приложение.
   */
  public async please(): Promise<INestApplication> {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigGetter)
      .useClass(this.config)
      .compile();

    const app = moduleRef.createNestApplication();

    app.use(cookieParser());

    const configGetter = moduleRef.get(ConfigGetter);

    app.setGlobalPrefix(configGetter.getApiPrefix());

    await this.usersBuilder.build(app);

    await app.init();

    return app;
  }
}
