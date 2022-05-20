import { HashManager } from '../../../src/lib/HashManager';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('HashManager', () => {
  const hashBcryptSpy = jest.spyOn(bcrypt, 'hash');
  const genSaltBcryptSpy = jest.spyOn(bcrypt, 'genSalt');
  const compareBcryptSpy = jest.spyOn(bcrypt, 'compare');

  describe('hash', () => {
    it('Should return the hashed value', async () => {
      // hashMock.mockResolvedValueOnce('hashed value');
      genSaltBcryptSpy.mockImplementationOnce(() => 'salt');
      hashBcryptSpy.mockImplementationOnce(() => 'hashed value');

      const result = await HashManager.hash('value');

      expect(genSaltBcryptSpy).toHaveBeenCalled();
      expect(hashBcryptSpy).toHaveBeenCalledWith('value', 'salt');
      expect(result).toBe('hashed value');
    });
  });

  describe('compare', () => {
    it('Should return true when the values match', async () => {
      compareBcryptSpy.mockImplementationOnce(() => true);

      const result = await HashManager.compare('value', 'hash');

      expect(compareBcryptSpy).toHaveBeenCalledWith('value', 'hash');
      expect(result).toBe(true);
    });

    it('Should return false when the values not match', async () => {
      compareBcryptSpy.mockImplementationOnce(() => false);

      const result = await HashManager.compare('value', 'hash');

      expect(compareBcryptSpy).toHaveBeenCalledWith('value', 'hash');
      expect(result).toBe(false);
    });
  });
});
