import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterprisesService.create(createEnterpriseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.enterprisesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string, @Res() response: Response) {
    const enterprise = await this.enterprisesService.findById(id);

    if (!enterprise) {
      return response
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Enterprise not found' });
    }

    return response.json(enterprise);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterprisesService.update(id, updateEnterpriseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() response: Response) {
    await this.enterprisesService.delete(id);

    return response.end();
  }
}
