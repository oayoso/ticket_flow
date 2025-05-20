import { IsNotEmpty, IsEnum } from 'class-validator';
import { TicketPriority } from '../enums/ticket-priority.enum';

export class CreateTicketDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsEnum(TicketPriority)
  priority: TicketPriority;
}
