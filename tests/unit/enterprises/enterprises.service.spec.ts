import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { EnterprisesService } from '../../../src/enterprises/enterprises.service';

describe('EnterprisesService', () => {
  let enterpriseService: EnterprisesService;
  let prismaService: PrismaService;

  const findManyMock = jest.fn();
  const findUniqueMock = jest.fn();

  const prismaServiceMock = {
    enterprise: {
      create: jest.fn(),
      findMany: findManyMock,
      findUnique: findUniqueMock,
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnterprisesService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    enterpriseService = module.get<EnterprisesService>(EnterprisesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(enterpriseService).toBeDefined();
  });

  describe('create', () => {
    const createUserDataMock = {
      name: 'name',
      cnpj: 'cnpj',
      description: 'description',
      userId: 'user id',
      responsible: {
        name: 'responsible name',
        telephone: 'telephone',
        zipcode: 'zipcode',
        street: 'street',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
      },
    };

    it('Should create the enterprise and the responsible', async () => {
      await enterpriseService.create(createUserDataMock);

      expect(prismaService.enterprise.create).toHaveBeenCalledWith({
        data: {
          name: 'name',
          cnpj: 'cnpj',
          description: 'description',
          user: {
            connect: { id: 'user id' },
          },
          responsibles: {
            create: {
              name: 'responsible name',
              telephone: 'telephone',
              zipcode: 'zipcode',
              street: 'street',
              neighborhood: 'neighborhood',
              city: 'city',
              state: 'state',
              isMain: true,
            },
          },
        },
      });
    });
  });

  describe('findAll', () => {
    it('Should return all enterprises', async () => {
      findManyMock.mockImplementationOnce(() => [
        'enterprise 1',
        'enterprise 2',
        'enterprise 3',
        'enterprise 4',
      ]);

      const result = await enterpriseService.findAll();

      expect(prismaService.enterprise.findMany).toHaveBeenCalled();
      expect(result).toHaveLength(4);
    });
  });

  describe('findById', () => {
    it('Should return an enterprise when exists', async () => {
      findUniqueMock.mockImplementationOnce(() => 'enterprise');

      const result = await enterpriseService.findById('id');

      expect(prismaService.enterprise.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
        include: {
          locations: true,
          responsibles: true,
        },
      });
      expect(result).toBe('enterprise');
    });

    it('Should return null when an enterprise not exists', async () => {
      findUniqueMock.mockImplementationOnce(() => false);

      const result = await enterpriseService.findById('id');

      expect(prismaService.enterprise.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
        include: {
          locations: true,
          responsibles: true,
        },
      });
      expect(result).toBe(null);
    });
  });

  describe('update', () => {
    it('Should update a enterprise', async () => {
      const idMock = 'id';
      const enterpriseDataMock = {
        name: 'name',
        cnpj: 'cnpj',
        description: 'description',
      };

      await enterpriseService.update(idMock, enterpriseDataMock);

      expect(prismaService.enterprise.update).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
        data: {
          name: 'name',
          cnpj: 'cnpj',
          description: 'description',
        },
      });
    });
  });

  describe('delete', () => {
    it('Should delete a enterprise when it exists', async () => {
      await enterpriseService.delete('id');

      expect(prismaService.enterprise.delete).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
      });
    });
  });
});
