import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../src/users/users.service';
import { AuthService } from '../../../src/auth/auth.service';
import { HashManager } from '../../../src/lib/HashManager';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;

  const findByUsernameMock = jest.fn();
  const usersServiceMock = {
    findByUsername: findByUsernameMock,
  };

  const compareHashManagerSpy = jest.spyOn(HashManager, 'compare');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    findByUsernameMock.mockImplementation(() => ({
      user: 'user',
      password: 'hashed password',
    }));

    it('Should validate a user', async () => {
      compareHashManagerSpy.mockResolvedValueOnce(true);

      const result = await authService.validateUser('username', 'password');

      expect(usersService.findByUsername).toHaveBeenCalledWith('username');
      expect(compareHashManagerSpy).toHaveBeenCalledWith(
        'password',
        'hashed password',
      );
      expect(result).toBe(true);
    });

    it('Should not validate when the user not exists', async () => {
      findByUsernameMock.mockImplementationOnce(() => null);

      const result = await authService.validateUser('username', 'password');

      expect(usersService.findByUsername).toHaveBeenCalledWith('username');
      expect(result).toBe(false);
    });

    it('Should not validate a user when the password is incorrect', async () => {
      compareHashManagerSpy.mockResolvedValueOnce(false);

      const result = await authService.validateUser('username', 'password');

      expect(usersService.findByUsername).toHaveBeenCalledWith('username');
      expect(compareHashManagerSpy).toHaveBeenCalledWith(
        'password',
        'hashed password',
      );
      expect(result).toBe(false);
    });
  });
});
