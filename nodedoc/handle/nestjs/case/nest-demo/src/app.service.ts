import { Injectable } from '@nestjs/common';

/**
 * 业务逻辑部分
 */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
