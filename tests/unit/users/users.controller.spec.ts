import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { HashManager } from '../../../src/lib/HashManager';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

jest.mock('../../../src/lib/HashManager');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const hashValueHashManagerSpy = jest.spyOn(HashManager, 'hash');
  const findByIdMock = jest.fn();

  const usersServiceMock = {
    create: jest.fn(),
    findById: findByIdMock,
    delete: jest.fn(),
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

  describe('findById', () => {
    const idMock = 'id';
    const responseMock = {} as Response;

    responseMock.json = jest.fn();
    responseMock.status = jest.fn().mockReturnValue({
      json: responseMock.json,
    });

    it('Should return the user when exists', async () => {
      const userMock = {
        id: 'id',
        name: 'name',
        username: 'username',
        password: 'password',
      };

      findByIdMock.mockResolvedValueOnce(userMock);

      await usersController.findById(idMock, responseMock);

      expect(responseMock.json).toHaveBeenCalledWith({ user: userMock });
    });

    it('Should return a message when the user not found', async () => {
      findByIdMock.mockResolvedValueOnce(null);

      await usersController.findById(idMock, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(responseMock.json).toHaveBeenCalledWith({
        message: 'User not found',
      });
    });
  });

  describe('delete', () => {
    it('Should delete a user', async () => {
      await usersController.delete('id');

      expect(usersService.delete).toHaveBeenCalledWith('id');
    });
  });
});
