import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { LocationsService } from '../../../src/locations/locations.service';

describe('LocationsService', () => {
  let locationsService: LocationsService;
  let prismaService: PrismaService;

  const findUniqueMock = jest.fn();

  const prismaServiceMock = {
    location: {
      create: jest.fn(),
      findUnique: findUniqueMock,
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationsService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    locationsService = module.get<LocationsService>(LocationsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(locationsService).toBeDefined();
  });

  describe('create', () => {
    it('Should create a location', async () => {
      const locationDataMock = {
        name: 'name',
        zipcode: 'zipcode',
        street: 'street',
        neighborhood: 'neighborhood',
        city: 'city',
        state: 'state',
        enterpriseId: 'enterpriseId',
      };

      await locationsService.create(locationDataMock);

      expect(prismaService.location.create).toHaveBeenCalledWith({
        data: {
          name: 'name',
          zipcode: 'zipcode',
          street: 'street',
          neighborhood: 'neighborhood',
          city: 'city',
          state: 'state',
          enterprise: {
            connect: { id: 'enterpriseId' },
          },
        },
      });
    });
  });

  describe('findById', () => {
    it('Should return a location when it exists', async () => {
      findUniqueMock.mockResolvedValueOnce('location');

      const result = await locationsService.findById('id');

      expect(prismaService.location.findUnique).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
      });
      expect(result).toBe('location');
    });

    it('Should return null when the location not exists', async () => {
      findUniqueMock.mockResolvedValueOnce(false);

      const result = await locationsService.findById('id');

      expect(result).toBe(null);
    });
  });

  describe('delete', () => {
    it('Should delete a enterprise', async () => {
      await locationsService.delete('id');

      expect(prismaService.location.delete).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
      });
    });
  });
});
