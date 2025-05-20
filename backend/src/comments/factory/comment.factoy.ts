import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UserRepository } from '../../auth/repository/user.repository';
import { TicketRepository } from '../../tickets/repository/ticket.repository';
import { SendMessageDto } from '../dto/send-message.dto';

@Injectable()
export class CommentFactory {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly ticketRepository: TicketRepository,
    ) {}

    // async createFromCreateCommentDto(dto: CreateCommentDto) {
    //     const ticket = await this.ticketRepository.findOneBy(dto.ticketId);
    //     if (!ticket) throw new NotFoundException('Ticket not found');
    //     return ticket;
    // }

    // async createFromSendMessageDto(dto: SendMessageDto) {
    //     const receiver = await this.userRepository.findOneBy(dto.receiverId!);
    //     if (!receiver) throw new NotFoundException('Receiver not found');
    //     return receiver
    // }
}
