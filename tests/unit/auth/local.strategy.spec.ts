import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { LocalStrategy } from '../../../src/auth/local.strategy';

describe('AuthService', () => {
  let localStrategy: LocalStrategy;
  let authService: AuthService;

  const authServiceMock = {
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('Should validate a user', async () => {
      authServiceMock.validateUser.mockImplementationOnce(() => true);

      const result = await localStrategy.validate('username', 'password');

      expect(authService.validateUser).toHaveBeenCalledWith(
        'username',
        'password',
      );
      expect(result).toBe(true);
    });

    it('Should throw an error if the user not validated', async () => {
      authServiceMock.validateUser.mockImplementationOnce(() => false);

      try {
        await localStrategy.validate('username', 'password');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
