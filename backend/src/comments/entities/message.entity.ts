import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @CreateDateColumn()
  sent_at: Date;
}
