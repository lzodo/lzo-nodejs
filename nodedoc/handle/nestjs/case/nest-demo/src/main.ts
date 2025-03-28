import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 关闭nestjs日志
    // logger: false,
    // logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('/api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
