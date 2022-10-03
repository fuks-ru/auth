import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerService } from '@fuks-ru/common-backend';

import { AppModule } from 'backend/AppModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerService = app.get(SwaggerService);
  const configGetter = app.get(ConfigGetter);

  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Auth', app);

  await swaggerService.generateApiContract(document);
})();
