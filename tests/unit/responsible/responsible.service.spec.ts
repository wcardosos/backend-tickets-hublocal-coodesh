import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { ResponsibleService } from '../../../src/responsible/responsible.service';

describe('ResponsibleService', () => {
  let responsibleService: ResponsibleService;
  let prismaService: PrismaService;

  const createResponsibleMock = jest.fn();
  const findManyResponsibleMock = jest.fn();
  const prismaServiceMock = {
    responsible: {
      create: createResponsibleMock,
      findMany: findManyResponsibleMock,
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsibleService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    responsibleService = module.get<ResponsibleService>(ResponsibleService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(responsibleService).toBeDefined();
  });

  describe('create', () => {
    it('Should create a responsible', async () => {
      const responsibleDataMock = {
        name: 'name',
        telephone: 'telephone',
        zipcode: 'zipcode',
        street: 'street',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        isMain: true,
      };

      createResponsibleMock.mockImplementationOnce(() => 'new responsible');

      const result = await responsibleService.create(responsibleDataMock);

      expect(prismaService.responsible.create).toHaveBeenCalledWith({
        data: responsibleDataMock,
      });
      expect(result).toBe('new responsible');
    });
  });

  describe('findAll', () => {
    it('Should return all responsibles', async () => {
      findManyResponsibleMock.mockImplementationOnce(() => [
        'responsible 1',
        'responsible 2',
        'responsible 3',
      ]);

      const result = await responsibleService.findAll();

      expect(prismaService.responsible.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(3);
    });
  });

  describe('delete', () => {
    it('Should delete a responsible', async () => {
      await responsibleService.delete('id');

      expect(prismaService.responsible.delete).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
      });
    });
  });
});
