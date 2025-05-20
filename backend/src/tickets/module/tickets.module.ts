import { Module } from '@nestjs/common';
import { TicketsController } from '../controller/tickets.controller';
import { TicketsService } from '../service/tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../entities/ticket.entity';
import { User } from '../../auth/entities/user.entity';
import { TicketRepository } from '../repository/ticket.repository';
import { TicketFactory } from '../factory/tickets.factory';
import { AuthModule } from '../../auth/module/auth.module';
import { TicketGateway } from '../gateway/ticket.gateway';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService, TicketRepository, TicketFactory, TicketGateway],
  exports: [TicketRepository, TicketFactory]
})
export class TicketsModule {}
