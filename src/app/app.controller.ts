import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() response) {
    return response.json({ message: 'Logged' });
  }

  @Get('health-check')
  healthCheck(@Res() response: Response): Response {
    return response.json({ message: 'The system is working' });
  }
}
