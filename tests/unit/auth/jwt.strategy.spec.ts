import { Test, TestingModule } from '@nestjs/testing';
import { JwtStrategy } from '../../../src/auth/jwt.strategy';

jest.mock('../../../src/auth/constants', () => ({
  jwtConstants: {
    secret: 'secret',
  },
}));

describe('AuthService', () => {
  let localStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy],
    }).compile();

    localStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe('validate', () => {
    it('Should validate a user', async () => {
      const payloadMock = {
        username: 'username',
        sub: 'id',
      };

      const result = await localStrategy.validate(payloadMock);

      expect(result).toEqual({
        userId: 'id',
        username: 'username',
      });
    });
  });
});
