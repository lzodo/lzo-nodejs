import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
