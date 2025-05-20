import { Module } from '@nestjs/common';
import { CommentsController } from '../controller/comments.controller';
import { CommentsService } from '../service/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../auth/entities/user.entity';
import { Message } from '../entities/message.entity';
import { Comment } from '../entities/comment.entity';
import { CommentsGateway } from '../gateway/comments.gateway';
import { JwtModule } from '@nestjs/jwt';
import { CommentRepository } from '../repository/comment.repository';
import { MessageRepository } from '../repository/message.repository';
import { CommentFactory } from '../factory/comment.factoy';
import { AuthModule } from '../../auth/module/auth.module';
import { TicketsModule } from '../../tickets/module/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, User, Message, Comment]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    TicketsModule,
    AuthModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsGateway, CommentRepository, MessageRepository, CommentFactory],
})
export class CommentsModule {}
