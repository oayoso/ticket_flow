import { Module } from '@nestjs/common';
import { TicketsController } from '../controller/tickets.controller';
import { TicketsService } from '../service/tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../entities/ticket.entity';
import { User } from '../../auth/entities/user.entity';
import { TicketRepository } from '../repository/ticket.repository';
import { TicketFactory } from '../factory/tickets.factory';
import { AuthModule } from '../../auth/module/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User]),
    AuthModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService, TicketRepository, TicketFactory],
  exports: [TicketRepository, TicketFactory]
})
export class TicketsModule {}
