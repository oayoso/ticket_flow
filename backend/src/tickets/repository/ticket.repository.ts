import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { User } from '../../auth/entities/user.entity';

@Injectable()
export class TicketRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) {}

  create(data: Partial<Ticket>) {
    return this.repo.save(this.repo.create(data));
  }

  findAll() {
    return this.repo.find({ order: { created_at: 'DESC' } });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  findOneBy(id: string) {
    return this.repo.findOneBy({ id });
  }

  update(ticket: Ticket, changes: Partial<Ticket>) {
    Object.assign(ticket, changes);
    return this.repo.save(ticket);
  }

  async getMetrics() {
    const total = await this.repo.count();
    const byStatus = await this.repo
      .createQueryBuilder('t')
      .select('t.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('t.status')
      .getRawMany();

    return { total, byStatus };
  }
}
