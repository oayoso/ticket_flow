import { Injectable } from '@nestjs/common';
import { User } from '../../auth/entities/user.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { SendMessageDto } from '../dto/send-message.dto';
import { CommentRepository } from '../repository/comment.repository';
import { MessageRepository } from '../repository/message.repository';
import { CommentFactory } from '../factory/comment.factoy';
import { TicketFactory } from '../../tickets/factory/tickets.factory';
import { UserFactory } from '../../auth/factory/user.factory';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly messageRepo: MessageRepository,
    private readonly commentFactory: CommentFactory,
    private readonly ticketFactory: TicketFactory,
    private readonly userFactory: UserFactory
  ) {}

  async createComment(dto: CreateCommentDto, user: User) {
    const ticket = await this.ticketFactory.createFromIdTicket(dto.ticketId)
    return this.commentRepo.create(dto.content, ticket, user);
  }

  findComments(ticketId: string) {
    return this.commentRepo.findByTicket(ticketId);
  }

  async sendMessage(dto: SendMessageDto, sender: User) {
    const receiver = await this.userFactory.createFromIdReciever(dto.receiverId)
    return this.messageRepo.create(dto.content, sender, receiver);
  }

  findDirectMessages(user1Id: string, user2Id: string) {
    return this.messageRepo.findBetweenUsers(user1Id, user2Id);
  }
}
