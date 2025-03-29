import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Logs } from '@/logs/entity/logs.entity';

@Injectable()
export class UserService {
  // 这个是，官方在 @nestjs/typeorm 内部封装的 @Injectable() 类，直接用不需要管（需要再外面导入 UserRepository）
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
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

  // 连表查询
  // select logs.result,count(*) count from logs,user u WHERE u.id=logs.userId and u.id=1 GROUP BY logs.result ORDER BY logs.result DESC;
  // select logs.result as result,count(logs.result) as count from logs,user where user.id=logs.userId AND user.id=1 GROUP BY logs.result ORDER BY logs.result DESC;
  findLogsByGroup(id: number = 1) {
    return (
      this.logsRepository
        // 查询表logs
        .createQueryBuilder('logs')
        // 查询属性 logs.result as 别名位result
        .select('logs.result', 'result')
        // 添加聚合属性统计 result 分类的记录综合，并命别名位count
        .addSelect('count(logs.result)', 'count')
        // 关联用户表, 并设置关联关系 logs.user 其实就是 userId，指向对应的用户
        .leftJoinAndSelect('logs.user', 'user')
        // 找到指定id的用户
        .where('user.id = :id', { id })
        // 分组
        .groupBy('logs.result')
        // 排序,降序
        .orderBy('logs.result', 'DESC')
        // 偏移
        .offset(1)
        // 限制数量
        .limit(3)
        // 结束
        .getRawMany()

      // 原生查询
      // this.logsRepository.query(
      //   'select logs.result as result,count(logs.result) as count from logs,user where user.id=logs.userId AND user.id=1 GROUP BY logs.result ORDER BY logs.result DESC',
      // )
    );
  }
}
