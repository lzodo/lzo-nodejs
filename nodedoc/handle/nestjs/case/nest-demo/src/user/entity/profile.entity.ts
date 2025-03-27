import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @Column()
  address: string;

  /**
   * 建立用户信息表和用户表的一对一关系
   * 1、OneToOne 参数使用函数，可以在需要的时候调用
   * 2、JoinColumn 再单前表创建管理的字段（外键）
   * 3、user: User; 将匹配时数据注入到 user 这个属性中（sequelize 关联关系中的别名）
   */
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' }) // 不指定外键名，默认也是小驼峰
  user: User;
}
