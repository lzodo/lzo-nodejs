import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
