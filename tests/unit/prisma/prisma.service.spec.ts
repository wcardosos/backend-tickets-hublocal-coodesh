import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma/prisma.service';

jest.mock('@prisma/client');

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [PrismaService],
    }).compile();

    prismaService = app.get<PrismaService>(PrismaService);
  });

  describe('onModuleInit', () => {
    it('Should connect with the database', async () => {
      const connectPrismaClientSpy = jest.fn();
      prismaService.$connect = connectPrismaClientSpy;

      await prismaService.onModuleInit();

      expect(connectPrismaClientSpy).toHaveBeenCalled();
    });
  });

  describe('enableShutdownHooks', () => {
    it('Should set callback function before exit', async () => {
      const onPrismaClientSpy = jest.fn();
      const appMock = {} as INestApplication;

      prismaService.$on = onPrismaClientSpy;

      await prismaService.enableShutdownHooks(appMock);

      expect(onPrismaClientSpy).toHaveBeenCalledWith(
        'beforeExit',
        expect.anything(),
      );
    });
  });
});
