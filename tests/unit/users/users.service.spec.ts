import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CreateUserDto } from '../../../src/users/dto/create-user.dto';
import { UsersService } from '../../../src/users/users.service';

jest.mock('../../../src/prisma/prisma.service');

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  const prismaServiceMock = {
    user: {
      create: jest.fn(),
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
});
