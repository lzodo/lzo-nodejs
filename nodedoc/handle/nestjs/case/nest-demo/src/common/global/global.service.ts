import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  getGlobal() {
    console.log('global数据');
  }
}
