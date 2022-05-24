import { Test, TestingModule } from '@nestjs/testing';
import { LocationsController } from '../../../src/locations/locations.controller';
import { LocationsService } from '../../../src/locations/locations.service';

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  const locationsServiceMock = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [
        {
          provide: LocationsService,
          useValue: locationsServiceMock,
        },
      ],
    }).compile();

    locationsController = module.get<LocationsController>(LocationsController);
    locationsService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(locationsController).toBeDefined();
  });

  describe('create', () => {
    const createLocationDataMock = {
      name: 'name',
      zipcode: 'zipcode',
      street: 'street',
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      enterpriseId: 'enterpriseId',
    };

    it('Should create a location', async () => {
      await locationsController.create(createLocationDataMock);

      expect(locationsService.create).toHaveBeenCalledWith(
        createLocationDataMock,
      );
    });
  });
});
