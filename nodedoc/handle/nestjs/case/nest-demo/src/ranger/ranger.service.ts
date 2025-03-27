import { Injectable } from '@nestjs/common';

@Injectable()
export class RangerService {
  getValue() {
    return [1];
  }
}
