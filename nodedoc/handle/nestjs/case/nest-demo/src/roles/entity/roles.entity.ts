import { User } from 'src/user/entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  /**
   * 角色和用户的多对多关系
   */
  @ManyToMany(() => User, (user) => user.roles)
  user: User[];
}
