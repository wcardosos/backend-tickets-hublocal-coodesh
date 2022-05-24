import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.enterprisesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterprisesService.update(id, updateEnterpriseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.enterprisesService.delete(id);
  }
}
