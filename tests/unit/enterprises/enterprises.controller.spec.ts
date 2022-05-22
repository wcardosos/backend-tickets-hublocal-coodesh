import { Test, TestingModule } from '@nestjs/testing';
import { EnterprisesController } from '../../../src/enterprises/enterprises.controller';
import { EnterprisesService } from '../../../src/enterprises/enterprises.service';

describe('EnterprisesController', () => {
  let controller: EnterprisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterprisesController],
      providers: [EnterprisesService],
    }).compile();

    controller = module.get<EnterprisesController>(EnterprisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
