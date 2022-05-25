import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { TicketsController } from '../../../src/tickets/tickets.controller';
import { TicketsService } from '../../../src/tickets/tickets.service';

describe('TicketsController', () => {
  let ticketsController: TicketsController;
  let ticketsService: TicketsService;

  const ticketsServiceMock = {
    create: jest.fn(),
  };

  const responseMock = {} as Response;
  responseMock.end = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [
        {
          provide: TicketsService,
          useValue: ticketsServiceMock,
        },
      ],
    }).compile();

    ticketsController = module.get<TicketsController>(TicketsController);
    ticketsService = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(ticketsController).toBeDefined();
  });

  describe('create', () => {
    it('Should create a ticket', async () => {
      const createTicketDtoMock = {
        locationName: 'location name',
        locationId: 'location id',
        userId: 'user id',
        responsibleId: 'responsible id',
      };

      await ticketsController.create(createTicketDtoMock, responseMock);

      expect(ticketsService.create).toHaveBeenCalledWith(createTicketDtoMock);
      expect(responseMock.end).toHaveBeenCalled();
    });
  });
});
