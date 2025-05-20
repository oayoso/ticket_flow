import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly repo: Repository<Comment>,
  ) {}

  async create(content: string, ticket: Ticket, author: User) {
    console.log("content: string, ticket: Ticket, author: User", { content, ticket, author })
    const comment = this.repo.create({ content, ticket, author });
    return this.repo.save(comment);
  }

  findByTicket(ticketId: string) {
    return this.repo.find({
      where: { ticket: { id: ticketId } },
      order: { created_at: 'ASC' },
      relations: ['author'],
    });
  }
}
