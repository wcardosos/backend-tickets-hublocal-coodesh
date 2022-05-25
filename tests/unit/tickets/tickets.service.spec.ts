import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { TicketsService } from '../../../src/tickets/tickets.service';
import { IdGenerator } from '../../../src/lib/IdGenerator';

describe('TicketsService', () => {
  let ticketsService: TicketsService;
  let prismaService: PrismaService;

  const prismaServiceMock = {
    ticket: {
      create: jest.fn(),
    },
  };

  const generateIdGeneratorSpy = jest.spyOn(IdGenerator, 'generate');
  generateIdGeneratorSpy.mockReturnValue('id');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    ticketsService = module.get<TicketsService>(TicketsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(ticketsService).toBeDefined();
  });

  describe('create', () => {
    it('Should create a ticket', async () => {
      const createTicketDtoMock = {
        locationName: 'location name',
        locationId: 'location id',
        userId: 'user id',
        responsibleId: 'responsible id',
      };

      await ticketsService.create(createTicketDtoMock);

      expect(generateIdGeneratorSpy).toHaveBeenCalled();
      expect(prismaService.ticket.create).toHaveBeenCalledWith({
        data: {
          id: 'id',
          title: 'id-location name',
          status: 'PENDENTE',
          location: {
            connect: { id: 'location id' },
          },
          user: {
            connect: { id: 'user id' },
          },
          responsible: {
            connect: { id: 'responsible id' },
          },
        },
      });
    });
  });
});
