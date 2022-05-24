import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { LocationsController } from '../../../src/locations/locations.controller';
import { LocationsService } from '../../../src/locations/locations.service';

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  const findByIdMock = jest.fn();
  const locationsServiceMock = {
    create: jest.fn(),
    findById: findByIdMock,
    update: jest.fn(),
    delete: jest.fn(),
  };

  const responseMock = {} as Response;
  const responseJsonMock = jest.fn();
  responseMock.json = responseJsonMock;
  responseMock.status = jest.fn().mockReturnValue({
    json: responseJsonMock,
  });
  responseMock.end = jest.fn();

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

  afterEach(() => {
    jest.clearAllMocks();
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

  describe('update', () => {
    const updateLocationDataMock = {
      name: 'name',
      zipcode: 'zipcode',
      street: 'street',
      neighborhood: 'neighborhood',
      city: 'city',
      state: 'state',
      enterpriseId: 'enterpriseId',
    };

    it('Should update a location', async () => {
      await locationsController.update(
        'id',
        updateLocationDataMock,
        responseMock,
      );

      expect(locationsService.update).toHaveBeenCalledWith(
        'id',
        updateLocationDataMock,
      );
      expect(responseMock.end).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('Should return a location', async () => {
      findByIdMock.mockResolvedValueOnce('location');

      await locationsController.findById('id', responseMock);

      expect(locationsService.findById).toHaveBeenCalledWith('id');
      expect(responseMock.json).toHaveBeenCalledWith('location');
    });

    it('Should return a error message when the location not exists', async () => {
      findByIdMock.mockResolvedValueOnce(null);

      await locationsController.findById('id', responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(responseJsonMock).toHaveBeenCalledWith({
        message: 'Location not found',
      });
    });
  });

  describe('delete', () => {
    it('Should delete a location', async () => {
      await locationsController.delete('id', responseMock);

      expect(locationsService.delete).toHaveBeenCalledWith('id');
      expect(responseMock.end).toHaveBeenCalled();
    });
  });
});
