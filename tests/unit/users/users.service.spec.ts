import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { UsersService } from '../../../src/users/users.service';

jest.mock('../../../src/prisma/prisma.service');

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  const findUniqueMock = jest.fn();

  const prismaServiceMock = {
    user: {
      create: jest.fn(),
      findUnique: findUniqueMock,
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('Should create a new user', async () => {
      const createUserDtoMock = {
        name: 'name',
        username: 'username',
        password: 'password',
      };

      await usersService.create(createUserDtoMock as unknown as CreateUserDto);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          name: 'name',
          username: 'username',
          password: 'password',
        },
      });
    });
  });

  describe('findById', () => {
    it('Should return the user when exists', async () => {
      findUniqueMock.mockResolvedValueOnce({
        id: 'id',
        username: 'username',
        name: 'name',
      });

      const user = await usersService.findById('id');

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
        select: {
          id: true,
          username: true,
          name: true,
        },
      });
      expect(user).toEqual({
        id: 'id',
        username: 'username',
        name: 'name',
      });
    });

    it('Should return null when the user not exists', async () => {
      findUniqueMock.mockResolvedValueOnce(null);

      const user = await usersService.findById('id');

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
        select: {
          id: true,
          username: true,
          name: true,
        },
      });
      expect(user).toBeFalsy();
    });
  });

  describe('findByUsername', () => {
    it('Should return the user when exists', async () => {
      findUniqueMock.mockResolvedValueOnce('user');

      const user = await usersService.findByUsername('username');

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          username: 'username',
        },
      });
      expect(user).toBe('user');
    });

    it('Should return null when the user not exists', async () => {
      findUniqueMock.mockResolvedValueOnce(null);

      const user = await usersService.findByUsername('username');

      expect(findUniqueMock).toHaveBeenCalledWith({
        where: {
          username: 'username',
        },
      });
      expect(user).toBeFalsy();
    });
  });

  describe('delete', () => {
    it('Should delete a user when exists', async () => {
      usersService.findById = jest.fn().mockResolvedValue('user');

      await usersService.delete('id');

      expect(prismaService.user.delete).toHaveBeenCalledWith({
        where: {
          id: 'id',
        },
      });
    });

    it('Should not delete the user not exists', async () => {
      usersService.findById = jest.fn().mockResolvedValue(null);

      await usersService.delete('id');

      expect(prismaService.user.delete).not.toHaveBeenCalled();
    });
  });
});
