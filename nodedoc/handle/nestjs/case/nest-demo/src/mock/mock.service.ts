import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entity/user.entity';
import { Repository } from 'typeorm';
import * as Mock from 'mockjs';
import { hashPassword } from '@/utils/bcrypt';
import { Profile } from '@/user/entity/profile.entity';
import { Logs } from '@/logs/entity/logs.entity';

@Injectable()
export class MockService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // 模拟用户数据
  async mockUserData(count: number = 20) {
    interface DataType {
      data: User[];
    }
    const data = Mock.mock({
      [`data|${count}`]: [
        {
          'id|+1': 1,
          username: '@cname',
          password: await hashPassword('123456'),
        },
      ],
    }) as DataType;
    const values = data.data.map((item) => {
      return {
        ...item,
        username: item.username + Math.random().toString(16).slice(-4),
      };
    });

    return this.userRepository.save(values);
  }

  // 模拟用户的用户信息
  async mockUserProfile() {
    const users = await this.userRepository.find();
    await this.profileRepository.clear();

    users.forEach((item: User) => {
      const data: Profile = Mock.mock({
        'gender|1': ['男', '女', '未知'],
        photo: 'https://i.pravatar.cc/300?img=@integer(1,70)',
        address: Mock.Random.county(true),
        user: item, // 根据管理关系自动生成 userId
      });
      const profile = this.profileRepository.create(data);
      void this.profileRepository.save(profile);
    });
  }

  // 模拟用户日志
  async mockUserLogs() {
    const users = await this.userRepository.find();
    await this.logsRepository.clear();

    users.forEach((item: User) => {
      void this.createLogs(item, Math.ceil(Math.random() * 10) + 2);
    });
  }
  async createLogs(item: User, count: number = 5) {
    interface DataType {
      data: Logs[];
    }
    const data = Mock.mock({
      [`data|${count}`]: [
        {
          // 'id|+1': 1,
          path: '/api/@word(3,5)/@word(3,5)',
          mehtod: '@pick(["GET","POST","PUT","DELETE"])',
          data: {
            'id|1-1000': 1,
            name: '@cname',
            'status|1': [true, false],
          },
          'result|1': ['200', '304', '500'],
          user: item,
        },
      ],
    }) as DataType;

    return this.logsRepository.save(
      data.data.map((item) => {
        return {
          ...item,
          data: JSON.stringify(item.data),
        };
      }),
    );
  }
}
