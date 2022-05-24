import { Test, TestingModule } from '@nestjs/testing';
import { EnterprisesController } from '../../../src/enterprises/enterprises.controller';
import { EnterprisesService } from '../../../src/enterprises/enterprises.service';

describe('EnterprisesController', () => {
  let enterprisesController: EnterprisesController;
  let enterprisesService: EnterprisesService;

  const findAllMock = jest.fn();

  const enterprisesServiceMock = {
    create: jest.fn(),
    findAll: findAllMock,
  };

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
});
