import { Injectable } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { AssignTicketDto } from '../dto/assign-ticket.dto';
import { TicketRepository } from '../repository/ticket.repository';
import { TicketFactory } from '../factory/tickets.factory';
import { UserFactory } from '../../auth/factory/user.factory';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketRepo: TicketRepository,
    private readonly ticketFactory: TicketFactory,
    private readonly userFactory: UserFactory
  ) {}

  create(dto: CreateTicketDto, user: User) {
    const ticket = this.ticketFactory.createFromCreateTicketDtoAndUser(dto, user);
    return this.ticketRepo.create(ticket); 
  }

  findAll() {
    return this.ticketRepo.findAll();
  }

  findOne(id: string) {
    return this.ticketRepo.findOne(id);
  }

  async update(id: string, dto: UpdateTicketDto) {
    const ticket = await this.ticketFactory.createFromIdTicket(id);
    return this.ticketRepo.update(ticket, dto);
  }

  async assign(id: string, dto: AssignTicketDto) {
    const ticket = await this.ticketFactory.createFromIdTicket(id);
    const agent = await this.userFactory.createFromId(dto.agentId);

    return this.ticketRepo.update(ticket, { assigned_to: agent });
  }

  async getMetrics() {
    return this.ticketRepo.getMetrics();
  }
}
