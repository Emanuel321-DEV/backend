import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDTO, UpdateTicketDTO } from './dto/ticket.dto';
import { TicketEntity } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async findAll() {
    return this.ticketRepository
      .createQueryBuilder()
      .select('ticket')
      .from(TicketEntity, 'ticket')
      .groupBy('ticket.id')
      .getRawMany();
  }

  async store(data: CreateTicketDTO) {
    const ticket = await this.ticketRepository.create(data);

    ticket.title = `${ticket.title} - ${ticket.id}`;

    return await this.ticketRepository.save(ticket);
  }

  async findOneOrFail(id: string) {
    try {
      return await this.ticketRepository
        .createQueryBuilder()
        .select('ticket')
        .from(TicketEntity, 'ticket')
        .groupBy('ticket.id')
        .where('ticket.id = :id', { id: id })
        .getRawOne();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, data: UpdateTicketDTO) {
    try {
      const ticket = await this.ticketRepository.findOneOrFail({
        where: {
          id,
        },
      });

      data.title = `${data.title} - ${ticket.id}`;

      await this.ticketRepository.merge(ticket, data);

      return await this.ticketRepository.save(ticket);
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id: string) {
    await this.ticketRepository.findOneOrFail({
      where: {
        id,
      },
    });

    await this.ticketRepository.softDelete({ id });
  }
}
