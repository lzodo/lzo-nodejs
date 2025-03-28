import { User } from '../../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name3311: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @CreateDateColumn({
    name: 'create_time',
  })
  createTime: Date;

  @UpdateDateColumn({
    name: 'update_time',
  })
  updateTime: Date;

  /**
   * 角色和用户的多对多关系
   */
  @ManyToMany(() => User, (user) => user.roles)
  user: User[];
}
