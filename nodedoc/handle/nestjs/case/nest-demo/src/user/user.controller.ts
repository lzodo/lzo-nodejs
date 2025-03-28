import { Controller, Get, Logger, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  // 官方提供的日志工具
  logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}
  // const userService = new UserService()

  @Get()
  async getUsers(): Promise<User[]> {
    const result = await this.userService.findAll();
    this.logger.log('result');
    return result;
  }

  @Post()
  async createUser() {
    return await this.userService.create({
      username: 'test-1',
      password: '111111',
    } as User);
  }

  @Get('groupby')
  findLogsByGroup() {
    return this.userService.findLogsByGroup();
  }

  getUser(): any {
    const db = this.configService.get<string>(ConfigEnum.HOST);
    const yamlDb = this.configService.get<string>('db');
    console.log(db, yamlDb);
  }
}
