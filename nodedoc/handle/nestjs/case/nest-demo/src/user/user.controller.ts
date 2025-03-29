import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/enum/config.enum';
import { GlobalService } from '@/common/global/global.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Post()
  @ApiOperation({ summary: '创建用户' })
  create(@Body() createUserDto: CreateUserDto) {
    // 将请求体数据注入到 createUserDto 中
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取全部用户' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '通过id查询' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('groupby')
  @ApiOperation({ summary: '分组查询测试' })
  findLogsByGroup() {
    return this.userService.findLogsByGroup();
  }

  getUser(): any {
    const db = this.configService.get<string>(ConfigEnum.HOST);
    const yamlDb = this.configService.get<string>('db');
    console.log(this.globalService.getGlobal());
    console.log(db, yamlDb);
  }
}
