import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // const userService = new UserService()

  @Get()
  getUser(): any {
    return this.userService.getUser();
  }
}
