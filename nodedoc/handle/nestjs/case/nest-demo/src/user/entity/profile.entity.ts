import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
