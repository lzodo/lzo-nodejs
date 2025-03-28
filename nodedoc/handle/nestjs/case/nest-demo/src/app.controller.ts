import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

/**
 *  路由部分
 *  基础路径，空 => 默认路径/
 */
@ApiTags('全局')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // get请求，子路径/
  @Get()
  @ApiOperation({ summary: 'nestjs 验证服务' })
  getHello(): string {
    return this.appService.getHello();
  }
}
