import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, JwtService, PrismaService],
  exports: [TicketsService],
})
export class TicketsModule {}
