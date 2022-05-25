import { IdGenerator } from '../../../src/lib/IdGenerator';

jest.mock('uuid', () => ({
  v4: () => 'id',
}));

describe('Lib: IdGenerator', () => {
  it('Should return an id', () => {
    const result = IdGenerator.generate();

    expect(result).toBe('id');
  });
});
