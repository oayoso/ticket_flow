import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Ticket)
  ticket: Ticket;

  @ManyToOne(() => User)
  author: User;

  @CreateDateColumn()
  created_at: Date;
}
