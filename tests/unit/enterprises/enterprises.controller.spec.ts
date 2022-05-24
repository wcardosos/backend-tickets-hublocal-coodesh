import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { EnterprisesController } from '../../../src/enterprises/enterprises.controller';
import { EnterprisesService } from '../../../src/enterprises/enterprises.service';

describe('EnterprisesController', () => {
  let enterprisesController: EnterprisesController;
  let enterprisesService: EnterprisesService;

  const findAllMock = jest.fn();
  const findByIdMock = jest.fn();

  const enterprisesServiceMock = {
    create: jest.fn(),
    findAll: findAllMock,
    findById: findByIdMock,
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
      controllers: [EnterprisesController],
      providers: [
        {
          provide: EnterprisesService,
          useValue: enterprisesServiceMock,
        },
      ],
    }).compile();

    enterprisesController = module.get<EnterprisesController>(
      EnterprisesController,
    );
    enterprisesService = module.get<EnterprisesService>(EnterprisesService);
  });

  it('should be defined', () => {
    expect(enterprisesController).toBeDefined();
  });

  describe('create', () => {
    const createUserDtoMock = {
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

    it('Should create a enterprise', async () => {
      await enterprisesController.create(createUserDtoMock);

      expect(enterprisesService.create).toHaveBeenCalledWith({
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
      });
    });
  });

  describe('findAll', () => {
    it('Should return all enterprises', async () => {
      findAllMock.mockImplementationOnce(() => [
        'enterprise 1',
        'enterprise 2',
        'enterprise 3',
        'enterprise 4',
      ]);

      const result = await enterprisesController.findAll();

      expect(enterprisesService.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(4);
    });
  });

  describe('findById', () => {
    it('Should return when the enterprise exists', async () => {
      findByIdMock.mockImplementationOnce(() => 'enterprise');

      await enterprisesController.findById('id', responseMock);

      expect(responseMock.json).toHaveBeenCalledWith('enterprise');
    });

    it('Should return a error message when the enterprise not exists', async () => {
      findByIdMock.mockImplementationOnce(() => null);

      await enterprisesController.findById('id', responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: 'Enterprise not found',
      });
    });
  });

  describe('delete', () => {
    it('Should delete a enterprise', async () => {
      await enterprisesController.delete('id', responseMock);

      expect(enterprisesService.delete).toHaveBeenCalledWith('id');
      expect(responseMock.end).toHaveBeenCalled();
    });
  });
});
