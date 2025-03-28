import { Controller, Post } from '@nestjs/common';
import { MockService } from './mock.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('数据模拟')
@Controller('mock')
export class MockController {
  constructor(private mockService: MockService) {}

  @Post('user')
  @ApiOperation({ summary: '模拟用户数据' })
  createUserData() {
    return this.mockService.mockUserData();
  }

  @Post('profile')
  @ApiOperation({ summary: '模拟用户信息' })
  createUserProfile() {
    return this.mockService.mockUserProfile();
  }

  @Post('logs')
  @ApiOperation({ summary: '模拟用户日志' })
  createUserLogs() {
    return this.mockService.mockUserLogs();
  }
}
