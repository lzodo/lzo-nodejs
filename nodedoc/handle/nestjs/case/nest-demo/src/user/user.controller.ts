import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/enum/config.enum';
import { User } from './entity/user.entity';
import { GlobalService } from '@/common/global/global.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// import { Logger } from 'nestjs-pino';

@ApiTags('用户')
@Controller('user')
export class UserController {
  // 官方提供的日志工具
  // logger = new Logger(UserController.name);

  constructor(
    private userService: UserService, // 需要外面 providers 导入才能用
    private configService: ConfigService,
    private globalService: GlobalService, // @Global() exports 导出，外面不需要 providers 导入就能用
    // private logger: Logger,
  ) {}
  // const userService = new UserService()

  @Get()
  @ApiOperation({ summary: '获取全部用户' })
  async getUsers(): Promise<User[]> {
    console.log(this.globalService.getGlobal());
    // throw new Error('测试错误');
    const result = await this.userService.findAll();
    // 使用 pino 日志
    // this.logger.log('result', 333444);
    return result;
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  async createUser() {
    return await this.userService.create({
      username: 'test-1',
      password: '111111',
    } as User);
  }

  @Get('groupby')
  @ApiOperation({ summary: '分组查询测试' })
  findLogsByGroup() {
    return this.userService.findLogsByGroup();
  }

  getUser(): any {
    const db = this.configService.get<string>(ConfigEnum.HOST);
    const yamlDb = this.configService.get<string>('db');
    console.log(db, yamlDb);
  }
}
