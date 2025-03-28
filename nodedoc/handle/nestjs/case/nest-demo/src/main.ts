import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { setupSwagger } from './swagger/index';
async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      // 关闭nestjs日志
      // logger: false,
      // logger: ['error', 'warn'],
      cors: true,
    },
  );
  app.setGlobalPrefix('/api/v1');

  // 注册 Swagger 的配置顺序
  //  if (Config.get('swagger').enable) {
  setupSwagger(app);
  // }

  await app.listen(process.env.PORT ?? 3000);

  return app;
}
void bootstrap();
