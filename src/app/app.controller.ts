import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('health-check')
  healthCheck(@Res() response: Response): Response {
    return response.json({ message: 'The system is working' });
  }
}
