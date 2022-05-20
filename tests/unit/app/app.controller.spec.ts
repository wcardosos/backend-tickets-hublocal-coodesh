import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AppController } from '../../../src/app/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    const responseMock = {} as Response;
    responseMock.json = jest.fn().mockReturnValue('response');

    it('Should return response json content', () => {
      const result = appController.healthCheck(responseMock);

      expect(responseMock.json).toHaveBeenCalled();
      expect(result).toBe('response');
    });
  });
});
