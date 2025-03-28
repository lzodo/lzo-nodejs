import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}
  // const userService = new UserService()

  @Get()
  async getUsers(): Promise<User[]> {
    const result = await this.userService.findAll();
    // console.log(result);
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
