import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 *  路由部分
 *  基础路径，空 => 默认路径/
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // get请求，子路径/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
