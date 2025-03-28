import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { setupSwagger } from './swagger/index';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { Logger } from 'nestjs-pino';

async function bootstrap(): Promise<NestExpressApplication> {
  // const logger = new Logger();
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
  setupSwagger(app);

  // 全局过滤器
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter(app.get(Logger)));

  await app.listen(process.env.PORT ?? 3000);

  return app;
}
void bootstrap();
