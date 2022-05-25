import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from '../prisma/prisma.service';
import { IdGenerator } from '../lib/IdGenerator';

@Injectable()
export class TicketsService {
  constructor(private prismaService: PrismaService) {}

  async create(createTicketDto: CreateTicketDto): Promise<void> {
    const { locationName, locationId, userId, responsibleId } = createTicketDto;
    const id = IdGenerator.generate();
    const DEFAULT_STATUS = 'PENDENTE';

    await this.prismaService.ticket.create({
      data: {
        id,
        title: `${id}-${locationName}`,
        status: DEFAULT_STATUS,
        location: {
          connect: { id: locationId },
        },
        user: {
          connect: { id: userId },
        },
        responsible: {
          connect: { id: responsibleId },
        },
      },
    });
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
