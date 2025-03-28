import { Controller, Post } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private mockService: MockService) {}

  @Post('user')
  createUserData() {
    return this.mockService.mockUserData();
  }

  @Post('profile')
  createUserProfile() {
    return this.mockService.mockUserProfile();
  }

  @Post('logs')
  createUserLogs() {
    return this.mockService.mockUserLogs();
  }
}
