import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from '../auth/local-auth.guard';

@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
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
