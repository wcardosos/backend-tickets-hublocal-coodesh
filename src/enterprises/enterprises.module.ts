import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { ResponsibleService } from '../responsible/responsible.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService, PrismaService, ResponsibleService],
  exports: [EnterprisesService],
})
export class EnterprisesModule {}
