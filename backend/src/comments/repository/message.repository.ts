import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly repo: Repository<Message>,
  ) {}

  create(content: string, sender: User, receiver: User) {
    const msg = this.repo.create({ content, sender, receiver });
    return this.repo.save(msg);
  }

  findBetweenUsers(user1Id: string, user2Id: string) {
    return this.repo.createQueryBuilder('msg')
      .where('(msg.senderId = :u1 AND msg.receiverId = :u2) OR (msg.senderId = :u2 AND msg.receiverId = :u1)', {
        u1: user1Id,
        u2: user2Id,
      })
      .orderBy('msg.sent_at', 'ASC')
      .getMany();
  }
}
