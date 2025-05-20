import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, ManyToOne
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { TicketStatus } from '../enums/ticket-status.enum';
import { TicketPriority } from '../enums/ticket-priority.enum';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @Column({ type: 'enum', enum: TicketPriority, default: TicketPriority.MEDIUM })
  priority: TicketPriority;

  @ManyToOne(() => User, { eager: true })
  created_by: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  assigned_to: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
