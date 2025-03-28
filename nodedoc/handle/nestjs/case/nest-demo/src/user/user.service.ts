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

  async findAll() {
    return await this.userRepository.find({
      relations: {
        // 两边必须建立 profile 与 User的关联关系
        profile_xx: true,
        logs_xxx: true,
      },
    });
  }

  async find(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async create(user: User) {
    const userTmp = this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }

  // Partial<User> ：user 会取 User 上的一些属性，但不一定都有
  async update(id: number, user: Partial<User>) {
    return await this.userRepository.update(id, user);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
