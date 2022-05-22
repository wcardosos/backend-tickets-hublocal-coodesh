import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashManager } from '../lib/HashManager';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const { name, username, password } = createUserDto;

    const hashedPassword = await HashManager.hash(password);

    const newUser = {
      name,
      username,
      password: hashedPassword,
    };

    await this.usersService.create(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string, @Res() response: Response) {
    const user = await this.usersService.findById(id);
    if (user) {
      return response.json({ user });
    }

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'User not found' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/username/:username')
  async findByUsername(
    @Param('username') username: string,
    @Res() response: Response,
  ) {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      return response.json({ user });
    }

    return response
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: 'User not found' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
