import { Logs } from 'src/logs/entity/logs.entity';
import { Roles } from 'src/roles/entity/roles.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

// 指定表名（可选，默认使用类名小写）
@Entity()
export class User {
  // UUID 主键(没传 uuid 默认正常数字递增id)
  @PrimaryGeneratedColumn()
  id: string;

  // 类型、长度、
  @Column({ type: 'varchar', length: 50, unique: true, comment: '用户登录名' })
  username: string;

  // 普通列
  @Column()
  password: string;

  /**
   * 创建于日志的一对多关系
   *   (logs) => logs.user 让数据库查询用户的时候，去查logs表，把这个用户的日志信息，塞到属性logs（第二行key）中一起查询
   *             logs.user  就是去logs表找userId=当前id的记录
   */
  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  /**
   * 用户和角色的多对多关系
   */
  @ManyToMany(() => Roles, (roles) => roles.user)
  @JoinTable({ name: 'users_roles' }) // 创建关联表(不需要id，联合主键，联合索引)
  roles: Roles[];
}
