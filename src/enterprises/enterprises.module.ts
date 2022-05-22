import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { ResponsibleService } from 'src/responsible/responsible.service';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService, ResponsibleService],
})
export class EnterprisesModule {}
