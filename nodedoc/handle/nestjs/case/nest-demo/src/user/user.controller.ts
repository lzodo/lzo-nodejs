import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from 'src/enum/config.enum';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}
  // const userService = new UserService()

  @Get()
  getUser(): any {
    const db = this.configService.get<string>(ConfigEnum.HOST);
    console.log(db);

    return this.userService.getUser();
  }
}
