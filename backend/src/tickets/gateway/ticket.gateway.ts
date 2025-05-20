import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Ticket } from '../entities/ticket.entity';


@WebSocketGateway({ cors: true })
export class TicketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
  ) {}

  private logger = new Logger('CommentsGateway');

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;

      if (!token) throw new UnauthorizedException('No token provided');

      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'secret',
      });

      client.data.user = payload;
      this.logger.log(`User connected: ${payload.email}`);
    } catch (err) {
      this.logger.warn(`Socket connection rejected: ${err.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`User disconnected`);
  }

  notifyAgentAssigned(agentId: string, ticket: Ticket) {
    this.server.emit(`ticket-assigned-${agentId}`, ticket);
  }
}
