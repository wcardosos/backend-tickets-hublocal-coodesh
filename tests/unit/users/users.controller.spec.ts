import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { HashManager } from '../../../src/lib/HashManager';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';

jest.mock('../../../src/lib/HashManager');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const hashValueHashManagerSpy = jest.spyOn(HashManager, 'hash');

  const usersServiceMock = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('Should create a user', async () => {
      const createUserDtoMock = {
        name: 'name',
        username: 'username',
        password: 'password',
      } as CreateUserDto;

      hashValueHashManagerSpy.mockResolvedValueOnce('hashed password');

      await usersController.create(createUserDtoMock);

      expect(hashValueHashManagerSpy).toHaveBeenCalledWith('password');
      expect(usersService.create).toHaveBeenCalledWith({
        name: 'name',
        username: 'username',
        password: 'hashed password',
      });
    });
  });
});
