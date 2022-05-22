import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../src/users/users.service';
import { AuthService } from '../../../src/auth/auth.service';
import { HashManager } from '../../../src/lib/HashManager';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const findByUsernameMock = jest.fn();
  const signJwtMock = jest.fn().mockReturnValue('token');

  const usersServiceMock = {
    findByUsername: findByUsernameMock,
  };
  const jwtServiceMock = {
    sign: signJwtMock,
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
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
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
      expect(result).toEqual({ user: 'user' });
    });

    it('Should not validate when the user not exists', async () => {
      findByUsernameMock.mockImplementationOnce(() => null);

      const result = await authService.validateUser('username', 'password');

      expect(usersService.findByUsername).toHaveBeenCalledWith('username');
      expect(result).toBeNull();
    });

    it('Should not validate a user when the password is incorrect', async () => {
      compareHashManagerSpy.mockResolvedValueOnce(false);

      const result = await authService.validateUser('username', 'password');

      expect(usersService.findByUsername).toHaveBeenCalledWith('username');
      expect(compareHashManagerSpy).toHaveBeenCalledWith(
        'password',
        'hashed password',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('Should return a token', () => {
      const userMock = {
        id: 'id',
        username: 'username',
        name: 'name',
      };

      const result = authService.login(userMock);

      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'username',
        sub: 'id',
      });
      expect(result).toBe('token');
    });
  });
});
