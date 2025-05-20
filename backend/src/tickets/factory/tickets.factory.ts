import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../auth/repository/user.repository';
import { TicketRepository } from '../../tickets/repository/ticket.repository';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TicketFactory {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly ticketRepository: TicketRepository,
    ) {}

    async createFromIdTicket(id: string) {
        const ticket = await this.ticketRepository.findOneBy(id);
        if (!ticket) throw new NotFoundException('Ticket not found');
        return ticket;
    }

    createFromCreateTicketDtoAndUser(dto: CreateTicketDto, user: User) {
        const ticket = {
            title: dto.title,
            description: dto.description,
            priority: dto.priority,
            created_by: user,
        }
        return ticket;
    }
}
