import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // 这个是，官方在 @nestjs/typeorm 内部封装的 @Injectable() 类，直接用不需要管（需要再外面导入 UserRepository）
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getUser() {
    const res = await this.userRepository.find();
    return { code: 0, msg: res };
  }
}
