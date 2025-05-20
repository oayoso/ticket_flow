import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';
import { JwtService } from '@nestjs/jwt';


@WebSocketGateway({ cors: true })
export class CommentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly commentsService: CommentsService,
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

  @SubscribeMessage('join_ticket')
  handleJoinRoom(@MessageBody() ticketId: string, @ConnectedSocket() client: Socket) {
    client.join(`ticket-${ticketId}`);
  }

  @SubscribeMessage('comment')
  async handleComment(
    @MessageBody() data: { ticketId: string; content: string; user: any },
    @ConnectedSocket() client: Socket
  ) {
    const comment = await this.commentsService.createComment({ ticketId: data.ticketId, content: data.content }, data.user);
    this.server.to(`ticket-${data.ticketId}`).emit('new_comment', comment);
  }

  @SubscribeMessage('direct_message')
  async handleDM(
    @MessageBody() data: { receiverId: string; content: string; user: any },
    @ConnectedSocket() client: Socket
  ) {
    const message = await this.commentsService.sendMessage({ receiverId: data.receiverId, content: data.content }, data.user);
    this.server.emit(`dm-${data.receiverId}`, message);
  }
}
