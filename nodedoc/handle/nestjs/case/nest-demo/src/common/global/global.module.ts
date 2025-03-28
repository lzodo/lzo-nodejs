import { Global, Module } from '@nestjs/common';
import { GlobalController } from './global.controller';
import { GlobalService } from './global.service';

@Global() // 装饰器用于将模块声明为全局模块，使其提供的服务、控制器等可以在整个应用中直接使用，而无需在每个需要的地方显式导入
@Module({
  controllers: [GlobalController],
  providers: [GlobalService],
  exports: [GlobalService], // 必须导出才能全局使用
})
export class GlobalModule {}
