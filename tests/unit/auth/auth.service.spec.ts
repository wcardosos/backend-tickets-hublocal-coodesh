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
    it('Should validate a user', async () => {
      findByUsernameMock.mockImplementationOnce(() => ({
        user: 'user',
        password: 'hashed password',
      }));
      compareHashManagerSpy.mockResolvedValueOnce(true);

      const result = await authService.validateUser('username', 'password');

      expect(usersService.findByUsername).toHaveBeenCalledWith('username');
      expect(compareHashManagerSpy).toHaveBeenCalledWith(
        'password',
        'hashed password',
      );
      expect(result).toBe(true);
    });
  });
});
